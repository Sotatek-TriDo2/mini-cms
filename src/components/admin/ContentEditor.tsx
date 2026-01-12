'use client';

import { useState } from 'react';
import { Form, Input, Button, Space, message, Card, Divider } from 'antd';
import { Page } from '@/types';
import JsonEditor from './JsonEditor';
import { validateSDUISchema } from '@/lib/validation/sduiSchema';
import { slugify } from '@/lib/utils/slugify';
import { createPageAction, updatePageAction } from '@/actions/pageActions';
import { publishPageAction, unpublishPageAction } from '@/actions/publishActions';
import { useRouter } from 'next/navigation';
import SDUIRenderer from '../client/SDUIRenderer';

interface ContentEditorProps {
  page?: Page;
  mode: 'create' | 'edit';
}

const defaultSchema = JSON.stringify(
  {
    version: 1,
    root: {
      type: 'container',
      padding: 16,
      children: [
        { type: 'text', value: 'Hello SDUI', size: 'lg' },
      ],
    },
  },
  null,
  2
);

export default function ContentEditor({ page, mode }: ContentEditorProps) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [schemaJson, setSchemaJson] = useState(
    page ? JSON.stringify(page.schema, null, 2) : defaultSchema
  );
  const [schemaError, setSchemaError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [previewSchema, setPreviewSchema] = useState<any>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (mode === 'create' && !form.isFieldTouched('slug')) {
      form.setFieldValue('slug', slugify(title));
    }
  };

  const handleSchemaChange = (value: string) => {
    setSchemaJson(value);
    setSchemaError(undefined);

    // Try to parse and validate for preview
    try {
      const parsed = JSON.parse(value);
      const validation = validateSDUISchema(parsed);
      if (validation.success) {
        setPreviewSchema(parsed);
      } else {
        setPreviewSchema(null);
      }
    } catch {
      setPreviewSchema(null);
    }
  };

  const validateSchema = (): boolean => {
    try {
      const parsed = JSON.parse(schemaJson);
      const validation = validateSDUISchema(parsed);
      if (!validation.success) {
        setSchemaError(validation.error);
        return false;
      }
      return true;
    } catch (error) {
      setSchemaError('Invalid JSON format');
      return false;
    }
  };

  const handleSave = async (publish: boolean = false) => {
    try {
      await form.validateFields();
      if (!validateSchema()) {
        message.error('Please fix schema errors before saving');
        return;
      }

      setLoading(true);
      const values = form.getFieldsValue();
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('slug', values.slug);
      formData.append('schema', schemaJson);
      if (publish) {
        formData.append('status', 'PUBLISHED');
      }

      let result;
      if (mode === 'create') {
        result = await createPageAction(formData);
      } else {
        result = await updatePageAction(page!.id, formData);
      }

      if (result.success) {
        message.success(publish ? 'Page published successfully' : 'Page saved successfully');
        if (mode === 'create' && result.data) {
          router.push(`/admin/editor/${result.data.id}`);
        } else {
          router.refresh();
        }
      } else {
        message.error(result.error || 'Failed to save page');
      }
    } catch (error) {
      message.error('Please fill in all required fields');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (mode === 'edit' && page) {
      setLoading(true);
      const result = await publishPageAction(page.id);
      setLoading(false);
      if (result.success) {
        message.success('Page published successfully');
        router.refresh();
      } else {
        message.error(result.error || 'Failed to publish page');
      }
    } else {
      await handleSave(true);
    }
  };

  const handleUnpublish = async () => {
    if (mode === 'edit' && page) {
      setLoading(true);
      const result = await unpublishPageAction(page.id);
      setLoading(false);
      if (result.success) {
        message.success('Page unpublished successfully');
        router.refresh();
      } else {
        message.error(result.error || 'Failed to unpublish page');
      }
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div>
        <Card title={mode === 'create' ? 'Create New Page' : 'Edit Page'}>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              title: page?.title || '',
              slug: page?.slug || '',
            }}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please enter a title' }]}
            >
              <Input onChange={handleTitleChange} placeholder="Enter page title" />
            </Form.Item>

            <Form.Item
              label="Slug"
              name="slug"
              rules={[
                { required: true, message: 'Please enter a slug' },
                {
                  pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                  message: 'Slug must be lowercase alphanumeric with hyphens',
                },
              ]}
            >
              <Input placeholder="page-slug" />
            </Form.Item>

            <Form.Item label="SDUI Schema (JSON)">
              <JsonEditor value={schemaJson} onChange={handleSchemaChange} error={schemaError} />
            </Form.Item>

            <Space>
              <Button type="default" onClick={() => handleSave(false)} loading={loading}>
                Save as Draft
              </Button>
              {mode === 'edit' && page?.status === 'PUBLISHED' ? (
                <Button onClick={handleUnpublish} loading={loading}>
                  Unpublish
                </Button>
              ) : (
                <Button type="primary" onClick={handlePublish} loading={loading}>
                  Publish
                </Button>
              )}
              <Button onClick={() => router.push('/admin')}>Cancel</Button>
            </Space>
          </Form>
        </Card>
      </div>

      <div>
        <Card title="Preview">
          {previewSchema ? (
            <SDUIRenderer schema={previewSchema} />
          ) : (
            <div style={{ color: '#999', textAlign: 'center', padding: '40px' }}>
              Enter valid SDUI JSON to see preview
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
