import { Size, Offset } from './helper';
import { LayerConfig } from './layer';

export type MapInfo = {
  id?: string; // |-> added in code
  path?: string; // |-> added in code

  name?: string;
  description?: string;
  author?: string;
  tags?: string[];
  url?: string;
  screen?: string;
};

export type MapLayout = {
  size: Size;
  offset: Offset;
  layers: LayerConfig[];
};
