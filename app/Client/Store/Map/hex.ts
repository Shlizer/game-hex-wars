/* eslint-disable no-multi-assign */
/* eslint-disable react/static-property-placement */
/* eslint class-methods-use-this: off */

import TSManager from '../Tileset/manager';
import { Tile as TConfig } from '../../../Definitions/tileset';

export default class HexObject {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width = 0;
  height = 0;
  x = 0;
  y = 0;
  tileset: string;
  value: number | string;

  tile: TConfig;

  constructor(args: {
    tileset: string;
    value: number | string;
    x: number;
    y: number;
  }) {
    this.x = args.x;
    this.y = args.y;
    this.tileset = args.tileset;
    this.value = args.value;

    this.canvas = document.createElement('canvas');
    const context = this.canvas.getContext('2d');
    const tile = TSManager.getTile(this.tileset, this.value);

    if (context) this.context = context;
    else throw new Error('Cannot create context for hex.');

    if (tile) this.tile = tile;
    else throw new Error('Cannot get tile data for hex.');

    this.setGfx();
  }

  setGfx() {
    if (this.tile.canvas) {
      const { width, height } = this.tile.canvas;
      this.canvas.width = this.width = width;
      this.canvas.height = this.height = height;
      this.context.drawImage(this.tile.canvas, 0, 0, width, height);
      this.context.fillStyle = 'white';
      this.context.font = 'normal 1.2em Lato';
      this.context.textAlign = 'center';
      this.context.fillText(`${this.x}, ${this.y}`, width / 2, height / 2);
    }
  }

  getGfx(): HTMLCanvasElement {
    return this.canvas;
  }
}
