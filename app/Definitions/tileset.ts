export type Tile = {
  // --- only in code
  id?: string;
  image?: HTMLImageElement;
  imageData?: ImageData;
  // ---
  file: string;
  name?: string;
  description?: string;
  hex?: {
    width?: number;
    height?: number;
  };
  offset?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  alphaColor?: [number, number, number];
};

export type Tileset = {
  // --- only in code
  id?: string;
  path?: string;
  image?: HTMLImageElement;
  // ---
  name?: string;
  description?: string;
  author?: string;
  grouped?: boolean;
  hex: {
    width: number;
    height: number;
  };
  offset?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  alphaColor?: [number, number, number];
  // for grouped
  file?: string;
  // for not grouped
  extension?: string;
  tiles?: {
    [key: string]: Tile;
  };
};
