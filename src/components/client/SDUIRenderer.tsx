import { SDUISchema, SDUINode } from '@/types';
import ContainerNode from './nodes/ContainerNode';
import TextNode from './nodes/TextNode';
import ImageNode from './nodes/ImageNode';
import ButtonNode from './nodes/ButtonNode';
import UnsupportedNode from './nodes/UnsupportedNode';
import { Alert } from 'antd';

interface SDUIRendererProps {
  schema: SDUISchema;
}

function renderNode(node: SDUINode, index: number): React.ReactNode {
  try {
    switch (node.type) {
      case 'container':
        return (
          <ContainerNode key={index} node={node}>
            {node.children.map((child, childIndex) => renderNode(child, childIndex))}
          </ContainerNode>
        );
      case 'text':
        return <TextNode key={index} node={node} />;
      case 'image':
        return <ImageNode key={index} node={node} />;
      case 'button':
        return <ButtonNode key={index} node={node} />;
      default:
        return <UnsupportedNode key={index} type={(node as any).type} />;
    }
  } catch (error) {
    console.error('Error rendering node:', error);
    return <UnsupportedNode key={index} />;
  }
}

export default function SDUIRenderer({ schema }: SDUIRendererProps) {
  // Validate schema version
  if (schema.version !== 1) {
    return (
      <Alert
        message="Unsupported Schema Version"
        description={`This content uses schema version ${schema.version}, but only version 1 is supported.`}
        type="error"
        showIcon
      />
    );
  }

  return <div className="sdui-renderer">{renderNode(schema.root, 0)}</div>;
}
