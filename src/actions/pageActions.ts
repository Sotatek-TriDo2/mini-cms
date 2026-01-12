import { pageApi } from '@/lib/api/pageApi';
import { validateSDUISchema } from '@/lib/validation/sduiSchema';
import { createPageSchema, updatePageSchema } from '@/lib/validation/pageValidation';

export async function getAllPagesAction() {
  return await pageApi.getAllPages();
}

export async function getPageByIdAction(id: string) {
  return await pageApi.getPageById(id);
}

export async function createPageAction(formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const schemaJson = formData.get('schema') as string;

  // Parse JSON
  let parsedSchema;
  try {
    parsedSchema = JSON.parse(schemaJson);
  } catch (error) {
    return { success: false, error: 'Invalid JSON format' };
  }

  // Validate SDUI schema
  const schemaValidation = validateSDUISchema(parsedSchema);
  if (!schemaValidation.success) {
    return { success: false, error: `Schema validation failed: ${schemaValidation.error}` };
  }

  // Validate page data
  const validation = createPageSchema.safeParse({
    title,
    slug,
    schema: parsedSchema,
  });

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.errors.map((e) => e.message).join(', '),
    };
  }

  const result = await pageApi.createPage(validation.data);
  
  return result;
}

export async function updatePageAction(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const schemaJson = formData.get('schema') as string;
  const status = formData.get('status') as 'DRAFT' | 'PUBLISHED' | null;

  const updateData: any = { id };

  if (title) updateData.title = title;
  if (slug) updateData.slug = slug;
  if (status) updateData.status = status;

  if (schemaJson) {
    // Parse JSON
    let parsedSchema;
    try {
      parsedSchema = JSON.parse(schemaJson);
    } catch (error) {
      return { success: false, error: 'Invalid JSON format' };
    }

    // Validate SDUI schema
    const schemaValidation = validateSDUISchema(parsedSchema);
    if (!schemaValidation.success) {
      return { success: false, error: `Schema validation failed: ${schemaValidation.error}` };
    }

    updateData.schema = parsedSchema;
  }

  // Validate update data
  const validation = updatePageSchema.safeParse(updateData);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.errors.map((e) => e.message).join(', '),
    };
  }

  const result = await pageApi.updatePage(id, updateData);
  
  return result;
}

export async function deletePageAction(id: string) {
  const result = await pageApi.deletePage(id);
  
  return result;
}
