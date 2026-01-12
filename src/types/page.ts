import { SDUISchema } from './sdui';

export interface Page {
  id: string;
  slug: string;
  title: string;
  status: 'DRAFT' | 'PUBLISHED';
  schema: SDUISchema;
  updatedAt: number;
}

export type PageStatus = Page['status'];

export interface CreatePageInput {
  title: string;
  slug: string;
  schema: SDUISchema;
}

export interface UpdatePageInput {
  id: string;
  title?: string;
  slug?: string;
  schema?: SDUISchema;
  status?: PageStatus;
}
