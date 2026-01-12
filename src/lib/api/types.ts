import { Page } from '@/types';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PageApiInterface {
  getAllPages(): Promise<ApiResponse<Page[]>>;
  getPageById(id: string): Promise<ApiResponse<Page | null>>;
  getPageBySlug(slug: string): Promise<ApiResponse<Page | null>>;
  getPublishedPageBySlug(slug: string): Promise<ApiResponse<Page | null>>;
  createPage(data: { title: string; slug: string; schema: any }): Promise<ApiResponse<Page>>;
  updatePage(id: string, data: Partial<Page>): Promise<ApiResponse<Page>>;
  publishPage(id: string): Promise<ApiResponse<Page>>;
  unpublishPage(id: string): Promise<ApiResponse<Page>>;
  deletePage(id: string): Promise<ApiResponse<void>>;
}
