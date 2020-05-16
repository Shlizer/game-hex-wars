import { Size, Offset, OffsetOut, SizeOut } from './helper';
import { TileConfig, TileConfigOut } from './tile';

export type TilesetConfig = {
  id?: string;
  path?: string;

  name: string;
  description: string;
  author: string;
  grouped: boolean;
  hex: Size;
  offset: Offset;

  // for grouped
  file: string;
  image?: HTMLImageElement;

  // for not grouped
  extension: string;
  tiles: {
    [key: string]: TileConfig;
  };
};

// DATA FROM OUTSIDE
export type TilesetConfigOut = {
  name: string;
  description?: string;
  author?: string;
  grouped: boolean;
  hex?: SizeOut;
  offset?: OffsetOut;

  // for grouped
  file?: string;

  // for not grouped
  extension?: string;
  tiles?: {
    [key: string]: TileConfigOut;
  };
};
