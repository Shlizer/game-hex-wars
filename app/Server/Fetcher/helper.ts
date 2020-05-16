import { Size, SizeOut, Offset, OffsetOut } from '../../Definitions/helper';

export function getSize(original?: SizeOut): Size {
  if (original) {
    return { w: original.width || 0, h: original.height || 0 };
  }
  return { w: 0, h: 0 };
}

export function getOffset(original?: OffsetOut): Offset {
  if (original) {
    return {
      top: original.top || 0,
      left: original.left || 0,
      right: original.right || 0,
      bottom: original.bottom || 0
    };
  }
  return { top: 0, left: 0, right: 0, bottom: 0 };
}
