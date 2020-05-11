export type Config = {
  // only in code
  id?: string;
  path?: string;
  image?: HTMLImageElement;
  //
  name?: string;
  description?: string;
  author?: string;
  grouped?: boolean;
  offset?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  alphaColor?: [number, number, number];
  // for grouped
  file?: string;
  // for not grouped
  extension?: string;
  tiles?: {
    image?: HTMLImageElement;
    file: string;
    name?: string;
    description?: string;
    offset?: {
      top?: number;
      left?: number;
      right?: number;
      bottom?: number;
    };
    alphaColor?: [number, number, number];
  }[];
};
