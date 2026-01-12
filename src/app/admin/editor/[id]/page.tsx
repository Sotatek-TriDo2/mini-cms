'use client';

import { getPageByIdAction } from '@/actions/pageActions';
import ContentEditor from '@/components/admin/ContentEditor';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '@/components/shared/Loading';
import { Page } from '@/types';

export default function EditPageEditor({
  params,
}: {
  params: { id: string };
}) {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadPage() {
      const result = await getPageByIdAction(params.id);
      if (result.success && result.data) {
        setPage(result.data);
      } else {
        setError(true);
      }
      setLoading(false);
    }
    loadPage();
  }, [params.id]);

  if (loading) {
    return <Loading />;
  }

  if (error || !page) {
    notFound();
  }

  return <ContentEditor mode="edit" page={page} />;
}
