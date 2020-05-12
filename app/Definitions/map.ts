export enum LayerType {
  'TILE',
  'BMP',
  'PATH'
}

export type TypeInfo = {
  id?: string;
  name?: string;
  description?: string;
  author?: string;
  tags?: string[];
  url?: string;
  screen?: string;
};

export type TypeLayout = {
  size: {
    width: number;
    height: number;
  };
  layers: {
    type: LayerType;
    alpha?: number;
    // BMP
    size: [number, number];
    offset?: [number, number];
    file: string;
    alphaColor?: [number, number, number];
    // TILE
    tileset: string;
    tiles: number[][];
  }[];
};
