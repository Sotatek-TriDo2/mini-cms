import { Alert } from 'antd';

interface UnsupportedNodeProps {
  type?: string;
}

export default function UnsupportedNode({ type }: UnsupportedNodeProps) {
  return (
    <Alert
      message="Unsupported Content"
      description={type ? `Unknown node type: "${type}"` : 'Unknown node structure'}
      type="warning"
      showIcon
      style={{ margin: '8px 0' }}
    />
  );
}
