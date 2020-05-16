import { Size, Offset, SizeOut, OffsetOut } from './helper';
import { LayerConfig, LayerConfigOut } from './layer';

export type MapInfo = {
  id: string;
  path: string;
  name: string;
  description: string;
  author: string;
  tags: string[];
  url: string;
  screen?: string;
};

export type MapLayout = {
  size: Size;
  hex: Size;
  offset: Offset;
  layers: LayerConfig[];
  path: number[][];
};

// DATA FROM OUTSIDE
export type MapInfoOut = {
  name?: string;
  description?: string;
  author?: string;
  tags?: string[];
  url?: string;
  screen?: string;
};

export type MapLayoutOut = {
  size: SizeOut;
  hex: SizeOut;
  offset?: OffsetOut;
  layers: LayerConfigOut[];
  path?: number[][];
};
