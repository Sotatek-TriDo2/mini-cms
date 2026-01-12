import { ContainerNode as ContainerNodeType } from '@/types';
import { ReactNode } from 'react';

interface ContainerNodeProps {
  node: ContainerNodeType;
  children: ReactNode;
}

export default function ContainerNode({ node, children }: ContainerNodeProps) {
  return (
    <div
      style={{
        padding: node.padding ? `${node.padding}px` : undefined,
      }}
    >
      {children}
    </div>
  );
}
