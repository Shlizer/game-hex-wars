/* eslint-disable no-multi-assign */
/* eslint-disable react/static-property-placement */
/* eslint class-methods-use-this: off */

import TSManager from '../Tileset/manager';
import { TileConfig } from '../../../Definitions/tile';
import WithContext from '../_withContext';

export default class HexObject extends WithContext {
  width = 0;
  height = 0;
  x = 0;
  y = 0;
  tileset: string;
  value: number | string;

  tile: TileConfig;

  constructor(args: {
    tileset: string;
    value: number | string;
    x: number;
    y: number;
  }) {
    super();
    this.x = args.x;
    this.y = args.y;
    this.tileset = args.tileset;
    this.value = args.value;

    const tile = TSManager.getTile(this.tileset, this.value);
    if (tile) {
      this.tile = tile;
      this.width = tile.hex?.width || 0;
      this.height = tile.hex?.height || 0;
    } else throw new Error('Cannot get tile data for hex.');

    this.setGfx();
  }

  setGfx() {
    if (this.tile.canvas) {
      this.canvas.width = this.tile.canvas.width;
      this.canvas.height = this.tile.canvas.height;
      this.context.drawImage(
        this.tile.canvas,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }
  }

  getGfx(): HTMLCanvasElement {
    return this.canvas;
  }

  getPositionX(): number {
    return this.x * this.width * 0.75;
  }

  getPositionY(): number {
    return (
      this.y * this.height +
      (this.x % 2 ? this.height / 2 : 0) -
      (this.tile.offset?.top || 0)
    );
  }

  getWidth(): number {
    return (
      this.width +
      (this.tile.offset?.left || 0) +
      (this.tile.offset?.right || 0)
    );
  }

  getHeight(): number {
    return (
      this.height +
      (this.tile.offset?.top || 0) +
      (this.tile.offset?.bottom || 0)
    );
  }
}
