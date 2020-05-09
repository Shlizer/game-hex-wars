export type TypeInfo = {
  id: string | undefined;
  name: string;
  description: string;
  author: string;
};

export type TypeLayout = {
  layers: {
    name: string;
    tileset: string;
    size: [number, number];
    tiles: number[][];
  }[];
};

export type TypeMap = {
  info: TypeInfo;
  layout: TypeLayout;
}[];
