import { Offset } from './helper';

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
