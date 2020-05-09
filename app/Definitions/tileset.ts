export type TilesetConfig = {
  name: string;
  description: string;
  author: string;
  file: string;
  extension: string;
  gridSize: {
    width: number;
    height: number;
  };
  size: {
    width: number;
    height: number;
  };
  offset: {
    x: number;
    y: number;
  };
};
