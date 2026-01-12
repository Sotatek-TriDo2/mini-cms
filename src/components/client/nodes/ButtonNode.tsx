'use client';

import { ButtonNode as ButtonNodeType } from '@/types';
import { Button } from 'antd';

interface ButtonNodeProps {
  node: ButtonNodeType;
}

export default function ButtonNode({ node }: ButtonNodeProps) {
  const handleClick = () => {
    if (node.action.type === 'alert') {
      alert(node.action.message);
    }
  };

  return (
    <Button
      type="primary"
      onClick={handleClick}
      style={{ margin: '8px 0' }}
    >
      {node.label}
    </Button>
  );
}
