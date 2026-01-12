'use client';

import { getAllPagesAction } from '@/actions/pageActions';
import ContentList from '@/components/admin/ContentList';
import { useEffect, useState } from 'react';
import Loading from '@/components/shared/Loading';
import { Page } from '@/types';

export default function AdminPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPages() {
      const result = await getAllPagesAction();
      if (result.success && result.data) {
        setPages(result.data);
      }
      setLoading(false);
    }
    loadPages();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <ContentList pages={pages} />;
}
