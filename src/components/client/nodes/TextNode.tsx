import { TextNode as TextNodeType } from '@/types';

interface TextNodeProps {
  node: TextNodeType;
}

const sizeMap = {
  sm: '14px',
  md: '16px',
  lg: '24px',
};

export default function TextNode({ node }: TextNodeProps) {
  const fontSize = node.size ? sizeMap[node.size] : sizeMap.md;

  return (
    <span
      style={{
        fontSize,
        display: 'inline-block',
      }}
    >
      {node.value}
    </span>
  );
}
