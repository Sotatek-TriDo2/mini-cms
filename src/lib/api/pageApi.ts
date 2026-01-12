import { indexedDBStorage } from '../storage/indexedDB';
import { Page } from '@/types';
import { ApiResponse, PageApiInterface } from './types';

class PageApi implements PageApiInterface {
  async getAllPages(): Promise<ApiResponse<Page[]>> {
    try {
      const pages = await indexedDBStorage.getAllPages();
      return { success: true, data: pages };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch pages',
      };
    }
  }

  async getPageById(id: string): Promise<ApiResponse<Page | null>> {
    try {
      const page = await indexedDBStorage.getPageById(id);
      return { success: true, data: page };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch page',
      };
    }
  }

  async getPageBySlug(slug: string): Promise<ApiResponse<Page | null>> {
    try {
      const page = await indexedDBStorage.getPageBySlug(slug);
      return { success: true, data: page };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch page',
      };
    }
  }

  async getPublishedPageBySlug(slug: string): Promise<ApiResponse<Page | null>> {
    try {
      const page = await indexedDBStorage.getPageBySlug(slug);
      if (page && page.status === 'PUBLISHED') {
        return { success: true, data: page };
      }
      return { success: true, data: null };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch page',
      };
    }
  }

  async createPage(data: {
    title: string;
    slug: string;
    schema: any;
  }): Promise<ApiResponse<Page>> {
    try {
      // Check for duplicate slug
      const existing = await indexedDBStorage.getPageBySlug(data.slug);
      if (existing) {
        return { success: false, error: 'A page with this slug already exists' };
      }

      const newPage: Page = {
        id: crypto.randomUUID(),
        title: data.title,
        slug: data.slug,
        status: 'DRAFT',
        schema: data.schema,
        updatedAt: Date.now(),
      };

      await indexedDBStorage.savePage(newPage);
      return { success: true, data: newPage };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create page',
      };
    }
  }

  async updatePage(id: string, data: Partial<Page>): Promise<ApiResponse<Page>> {
    try {
      const existing = await indexedDBStorage.getPageById(id);
      if (!existing) {
        return { success: false, error: 'Page not found' };
      }

      // Check for duplicate slug if slug is being updated
      if (data.slug && data.slug !== existing.slug) {
        const duplicate = await indexedDBStorage.getPageBySlug(data.slug);
        if (duplicate) {
          return { success: false, error: 'A page with this slug already exists' };
        }
      }

      const updatedPage: Page = {
        ...existing,
        ...data,
        id, // Ensure id doesn't change
        updatedAt: Date.now(),
      };

      await indexedDBStorage.savePage(updatedPage);
      return { success: true, data: updatedPage };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update page',
      };
    }
  }

  async publishPage(id: string): Promise<ApiResponse<Page>> {
    return this.updatePage(id, { status: 'PUBLISHED' });
  }

  async unpublishPage(id: string): Promise<ApiResponse<Page>> {
    return this.updatePage(id, { status: 'DRAFT' });
  }

  async deletePage(id: string): Promise<ApiResponse<void>> {
    try {
      await indexedDBStorage.deletePage(id);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete page',
      };
    }
  }
}

export const pageApi = new PageApi();
