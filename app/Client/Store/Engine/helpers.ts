import { Rect, Point, Cube } from '../../../Definitions/helper';

export function clearContext(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function cubeRound(cube: Cube) {
  let rx = Math.round(cube.x);
  let ry = Math.round(cube.y);
  let rz = Math.round(cube.z);

  const xDiff = Math.abs(rx - cube.x);
  const yDiff = Math.abs(ry - cube.y);
  const zDiff = Math.abs(rz - cube.z);

  if (xDiff > yDiff && xDiff > zDiff) {
    rx = -ry - rz;
  } else if (yDiff > zDiff) {
    ry = -rx - rz;
  } else {
    rz = -rx - ry;
  }

  return { x: rx, y: ry, z: rz };
}

export function cubeToOddQ(cube: Cube) {
  const col = cube.x;
  // eslint-disable-next-line no-bitwise
  const row = cube.z + (cube.x - (cube.x & 1)) / 2;
  return { x: col, y: row };
}

export function pixelToHex(positionAndSize: Rect): Point {
  // eslint-disable-next-line prefer-const
  let { x, y, w, h } = positionAndSize;
  x -= w / 2;
  y -= h / 2;
  const q = ((2 / 3) * x) / (w / 2);
  const r = ((-1 / 3) * x + (Math.sqrt(3) / 3) * y) / (w / 2);
  return cubeToOddQ(cubeRound({ x: q, y: -q - r, z: r }));
}

export function hexDrawPoints(positionAndSize: Rect): [number, number][] {
  const { x, y, w, h } = positionAndSize;
  const dx = x * w * 0.75;
  const dy = y * h + (x % 2 ? h / 2 : 0);

  return [
    [dx + w / 4, dy], // top - left
    [dx + (w * 3) / 4, dy], // top - right
    [dx + w, dy + h / 2], // right
    [dx + (w * 3) / 4, dy + h], // bottom - right
    [dx + w / 4, dy + h], // bottom - left
    [dx + 0, dy + h / 2] // left
  ];
}
