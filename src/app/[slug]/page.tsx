'use client';

import { pageApi } from '@/lib/api/pageApi';
import SDUIRenderer from '@/components/client/SDUIRenderer';
import ErrorBoundary from '@/components/client/ErrorBoundary';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Loading from '@/components/shared/Loading';
import Navbar from '@/components/shared/Navbar';

export default function ClientPage({ params }: { params: { slug: string } }) {
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPage() {
      const result = await pageApi.getPublishedPageBySlug(params.slug);
      setLoading(false);
      
      if (result.success && result.data) {
        setPage(result.data);
      } else {
        notFound();
      }
    }
    
    fetchPage();
  }, [params.slug]);

  if (loading) {
    return <Loading />;
  }

  if (!page) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '40px auto 0 auto', padding: '0 40px' }}>
        <ErrorBoundary>
          <SDUIRenderer schema={page.schema} />
        </ErrorBoundary>
      </div>
    </>
  );
}
