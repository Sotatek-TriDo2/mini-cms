import { DB_NAME, DB_VERSION, PAGES_STORE } from './schema';
import { Page } from '@/types';

class IndexedDBStorage {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private async getDB(): Promise<IDBDatabase> {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
      throw new Error('IndexedDB is only available in browser environments');
    }

    if (this.dbPromise) {
      return this.dbPromise;
    }

    this.dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create pages object store
        if (!db.objectStoreNames.contains(PAGES_STORE)) {
          const store = db.createObjectStore(PAGES_STORE, { keyPath: 'id' });
          store.createIndex('by-slug', 'slug', { unique: true });
          store.createIndex('by-status', 'status', { unique: false });
        }
      };
    });

    return this.dbPromise;
  }

  async getAllPages(): Promise<Page[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(PAGES_STORE, 'readonly');
      const store = transaction.objectStore(PAGES_STORE);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getPageById(id: string): Promise<Page | null> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(PAGES_STORE, 'readonly');
      const store = transaction.objectStore(PAGES_STORE);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async getPageBySlug(slug: string): Promise<Page | null> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(PAGES_STORE, 'readonly');
      const store = transaction.objectStore(PAGES_STORE);
      const index = store.index('by-slug');
      const request = index.get(slug);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async getPublishedPages(): Promise<Page[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(PAGES_STORE, 'readonly');
      const store = transaction.objectStore(PAGES_STORE);
      const index = store.index('by-status');
      const request = index.getAll('PUBLISHED');

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async savePage(page: Page): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(PAGES_STORE, 'readwrite');
      const store = transaction.objectStore(PAGES_STORE);
      const request = store.put(page);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async deletePage(id: string): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(PAGES_STORE, 'readwrite');
      const store = transaction.objectStore(PAGES_STORE);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export const indexedDBStorage = new IndexedDBStorage();
