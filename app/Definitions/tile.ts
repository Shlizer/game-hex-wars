import { Size, Offset } from './helper';

export type TileConfig = {
  id: string; // |-> added in code
  canvas: HTMLCanvasElement; // |-> added in code

  file: string;
  name: string;
  description: string;
  hex: Size;
  offset: Offset;
};
