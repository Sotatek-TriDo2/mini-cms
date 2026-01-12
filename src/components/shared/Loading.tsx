import { Spin } from 'antd';

export default function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
      <Spin size="large" />
    </div>
  );
}
