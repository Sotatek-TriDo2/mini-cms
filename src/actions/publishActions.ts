import { pageApi } from '@/lib/api/pageApi';

export async function publishPageAction(id: string) {
  const result = await pageApi.publishPage(id);
  
  return result;
}

export async function unpublishPageAction(id: string) {
  const result = await pageApi.unpublishPage(id);
  
  return result;
}
