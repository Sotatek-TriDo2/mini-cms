import { z } from 'zod';

// Base node schemas
const containerNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.literal('container'),
    padding: z.number().optional(),
    children: z.array(sduiNodeSchema),
  })
);

const textNodeSchema = z.object({
  type: z.literal('text'),
  value: z.string(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
});

const imageNodeSchema = z.object({
  type: z.literal('image'),
  src: z.string().url(),
  alt: z.string().optional(),
});

const buttonNodeSchema = z.object({
  type: z.literal('button'),
  label: z.string(),
  action: z.object({
    type: z.literal('alert'),
    message: z.string(),
  }),
});

// Union of all node types
const sduiNodeSchema = z.union([
  containerNodeSchema,
  textNodeSchema,
  imageNodeSchema,
  buttonNodeSchema,
]);

// Main SDUI schema
export const sduiSchemaValidator = z.object({
  version: z.literal(1),
  root: sduiNodeSchema,
});

export type ValidatedSDUISchema = z.infer<typeof sduiSchemaValidator>;

export function validateSDUISchema(data: unknown): {
  success: boolean;
  data?: ValidatedSDUISchema;
  error?: string;
} {
  try {
    const result = sduiSchemaValidator.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', '),
      };
    }
    return { success: false, error: 'Unknown validation error' };
  }
}
