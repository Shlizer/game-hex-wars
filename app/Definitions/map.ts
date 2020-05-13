export enum LayerType {
  TILE = 'TILE',
  BMP = 'BMP',
  PATH = 'PATH'
}

export type TypeInfo = {
  id?: string; // |-> added in code
  path?: string; // |-> added in code
  name?: string;
  description?: string;
  author?: string;
  tags?: string[];
  url?: string;
  screen?: string;
};

export type LayerData = {
  type: LayerType;
  alpha?: number;
  offset?: [number, number];

  // BMP
  file: string;

  // TILE
  tileset: string;
  tiles: (number | string)[][];
};

export type TypeLayout = {
  size: {
    width: number;
    height: number;
  };
  layers: LayerData[];
};
