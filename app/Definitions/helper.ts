export type Size = {
  w: number;
  h: number;
};

export type Offset = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

export type Point = {
  x: number;
  y: number;
};

export type Cube = {
  x: number;
  y: number;
  z: number;
};

export type Rect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

// DATA FROM OUTSIDE
export type SizeOut = {
  width?: number;
  height?: number;
};

export type OffsetOut = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};
