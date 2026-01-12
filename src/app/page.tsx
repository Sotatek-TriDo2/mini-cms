'use client';

import { Button } from 'antd';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ maxWidth: '800px', margin: '100px auto', textAlign: 'center' }}>
      <h1>Mini CMS</h1>
      <p style={{ fontSize: '18px', marginBottom: '32px' }}>
        A content management system with Server-Driven UI support
      </p>
      <Link href="/admin">
        <Button type="primary" size="large">
          Go to Admin Panel
        </Button>
      </Link>
    </div>
  );
}
