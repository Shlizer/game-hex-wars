import { Size, Offset } from './helper';
import { TileConfig } from './tile';

export type TilesetConfig = {
  id: string; // |-> added in code
  path: string; // |-> added in code
  image: HTMLImageElement; // |-> added in code, for groupped

  name: string;
  description: string;
  author: string;
  grouped: boolean;
  hex: Size;
  offset: Offset;

  // for grouped
  file: string;

  // for not grouped
  extension: string;
  tiles: {
    [key: string]: TileConfig;
  };
};
