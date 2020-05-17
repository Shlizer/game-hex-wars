import { Size, SizeOut, Offset, OffsetOut } from '../../Definitions/helper';

export function getSize(...original: (SizeOut | undefined)[]): Size {
  const size = { w: 0, h: 0 };
  if (original.length) {
    original.forEach(value => {
      if (value) {
        if (value.width !== undefined) size.w = value.width;
        if (value.height !== undefined) size.h = value.height;
      }
    });
  }
  return size;
}

export function getOffset(...original: (OffsetOut | undefined)[]): Offset {
  const offset = { top: 0, left: 0, right: 0, bottom: 0 };
  if (original.length) {
    original.forEach(value => {
      if (value) {
        if (value.top !== undefined) offset.top = value.top;
        if (value.left !== undefined) offset.left = value.left;
        if (value.right !== undefined) offset.right = value.right;
        if (value.bottom !== undefined) offset.bottom = value.bottom;
      }
    });
  }
  return offset;
}
