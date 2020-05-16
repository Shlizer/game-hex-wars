import { Size, Offset, SizeOut, OffsetOut } from './helper';

export type TileConfig = {
  id?: string;
  canvas?: HTMLCanvasElement;
  file: string;
  name: string;
  description: string;
  hex: Size;
  offset: Offset;
};

// DATA FROM OUTSIDE
export type TileConfigOut = {
  file?: string;
  name?: string;
  description?: string;
  hex?: SizeOut;
  offset?: OffsetOut;
};
