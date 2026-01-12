export const DB_NAME = 'mini-cms-db';
export const DB_VERSION = 1;
export const PAGES_STORE = 'pages';

export interface DBSchema {
  pages: {
    key: string;
    value: {
      id: string;
      slug: string;
      title: string;
      status: 'DRAFT' | 'PUBLISHED';
      schema: any;
      updatedAt: number;
    };
    indexes: {
      'by-slug': string;
      'by-status': string;
    };
  };
}
