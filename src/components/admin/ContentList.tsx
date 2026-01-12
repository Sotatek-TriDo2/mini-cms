'use client';

import { Table, Button, Space, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Page } from '@/types';
import StatusBadge from './StatusBadge';
import { formatRelativeTime } from '@/lib/utils/formatDate';
import { useRouter } from 'next/navigation';
import { deletePageAction } from '@/actions/pageActions';
import { useState } from 'react';

interface ContentListProps {
  pages: Page[];
}

export default function ContentList({ pages }: ContentListProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setLoading(id);
    const result = await deletePageAction(id);
    setLoading(null);
    
    if (result.success) {
      message.success('Page deleted successfully');
      router.refresh();
    } else {
      message.error(result.error || 'Failed to delete page');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Page) => (
        <a onClick={() => router.push(`/admin/editor/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      render: (text: string, record: Page) => (
        record.status === 'PUBLISHED' ? (
          <a href={`/${text}`} target="_blank" rel="noopener noreferrer">
            /{text}
          </a>
        ) : (
          `/${text}`
        )
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: Page['status']) => <StatusBadge status={status} />,
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (timestamp: number) => formatRelativeTime(timestamp),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Page) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => router.push(`/admin/editor/${record.id}`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete page"
            description="Are you sure you want to delete this page?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              loading={loading === record.id}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <h2>Content Pages</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push('/admin/editor/new')}
        >
          Create New Page
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={pages}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
