import { ImageNode as ImageNodeType } from '@/types';
import Image from 'next/image';

interface ImageNodeProps {
  node: ImageNodeType;
}

export default function ImageNode({ node }: ImageNodeProps) {
  return (
    <div style={{ margin: '8px 0' }}>
      <img
        src={node.src}
        alt={node.alt || 'Image'}
        style={{
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    </div>
  );
}
