import { Offset, OffsetOut } from './helper';

export enum LayerType {
  TILE = 'TILE',
  BMP = 'BMP'
}

export type LayerConfig = {
  type: LayerType;
  alpha: number;

  // BMP
  file: string;
  offset: Offset;

  // TILE
  tileset: string;
  tiles: (number | string)[][];
};

// DATA FROM OUTSIDE
export type LayerConfigOut = {
  type: LayerType;
  alpha?: number;
  file?: string;
  offset?: OffsetOut;
  tileset?: string;
  tiles?: (number | string)[][];
};
