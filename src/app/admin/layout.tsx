'use client';

import { Layout } from 'antd';
import Link from 'next/link';

const { Header, Content } = Layout;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', background: '#001529' }}>
        <Link href="/admin" style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
          Mini CMS Admin
        </Link>
      </Header>
      <Content style={{ padding: '24px 50px' }}>
        {children}
      </Content>
    </Layout>
  );
}
