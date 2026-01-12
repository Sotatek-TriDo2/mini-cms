export type SDUINode =
  | ContainerNode
  | TextNode
  | ImageNode
  | ButtonNode;

export interface ContainerNode {
  type: 'container';
  padding?: number;
  children: SDUINode[];
}

export interface TextNode {
  type: 'text';
  value: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface ImageNode {
  type: 'image';
  src: string;
  alt?: string;
}

export interface ButtonNode {
  type: 'button';
  label: string;
  action: {
    type: 'alert';
    message: string;
  };
}

export interface SDUISchema {
  version: 1;
  root: SDUINode;
}
