import { z } from 'zod';
import { sduiSchemaValidator } from './sduiSchema';

export const createPageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
  schema: sduiSchemaValidator,
});

export const updatePageSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required').optional(),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens')
    .optional(),
  schema: sduiSchemaValidator.optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
});

export function validateSlug(slug: string): { valid: boolean; error?: string } {
  if (!slug || slug.trim() === '') {
    return { valid: false, error: 'Slug cannot be empty' };
  }

  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(slug)) {
    return {
      valid: false,
      error: 'Slug must be lowercase alphanumeric characters with hyphens only',
    };
  }

  return { valid: true };
}
