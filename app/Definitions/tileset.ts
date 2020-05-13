export type Tile = {
  id?: string; // |-> added in code
  canvas?: HTMLCanvasElement; // |-> added in code

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
};

export type Tileset = {
  id?: string; // |-> added in code
  path?: string; // |-> added in code
  image?: HTMLImageElement; // |-> added in code

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

  // for grouped
  file?: string;

  // for not grouped
  extension?: string;
  tiles?: {
    [key: string]: Tile;
  };
};
