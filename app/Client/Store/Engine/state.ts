import { observable } from 'mobx';
import { Point } from '../../../Definitions/helper';

// Loop controls
export const loop = observable({
  firstDraw: true,
  shouldRedraw: true
});
// Mouse position (in map)
export const mouse: Point = observable({ x: 0, y: 0 });
// Hex hovered
export const hex: Point = observable({ x: 0, y: 0 });
// Hex selection
export const selected: Point = observable({ x: -1, y: -1 });
