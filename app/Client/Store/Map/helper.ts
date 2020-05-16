import { Size } from '../../../Definitions/helper';

export function getMapSize(
  hexesX = 0,
  hexesY = 0,
  hexWidth = 0,
  hexHeight = 0
): Size {
  return {
    w: hexesX * hexWidth * 0.75 + hexWidth * 0.25,
    h: hexesY * hexHeight + (hexesX && hexesX > 2 ? hexHeight / 2 : 0)
  };
}

export const a = 0;
