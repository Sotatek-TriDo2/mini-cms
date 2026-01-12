import { Tag } from 'antd';
import { PageStatus } from '@/types';

interface StatusBadgeProps {
  status: PageStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const color = status === 'PUBLISHED' ? 'green' : 'default';
  return <Tag color={color}>{status}</Tag>;
}
