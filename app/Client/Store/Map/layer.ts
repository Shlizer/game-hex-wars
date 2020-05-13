/* eslint-disable react/static-property-placement */
import { LayerConfig, LayerType } from '../../../Definitions/layer';
import LoopControl from '../Engine/loopControl';
import HexObject from './hex';

export default class LayerObject {
  data: LayerConfig;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  image?: HTMLImageElement;
  hexes: HexObject[] = [];
  width?: number;
  height?: number;

  constructor(data: LayerConfig) {
    this.data = data;
    this.canvas = document.createElement('canvas');
    const context = this.canvas.getContext('2d');

    if (context) this.context = context;
    else throw new Error('Cannot create context for layer.');

    this.context.globalAlpha = this.data.alpha || 1;
  }

  async load(mapPath: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.data.type === LayerType.BMP) {
        this.loadBMP(mapPath)
          .then(result => resolve(result))
          .catch(err => reject(err));
      } else {
        this.loadTILE()
          .then(result => resolve(result))
          .catch(err => reject(err));
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  update(_time: number) {}

  render(mainContext: CanvasRenderingContext2D) {
    if (LoopControl.shouldRedraw) {
      if (this.data.type === LayerType.BMP && this.image) {
        this.renderBMP(mainContext);
      } else if (this.data.type === LayerType.TILE) {
        this.renderTILE(mainContext);
      }
    }
  }

  async loadBMP(mapPath: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        this.image = image;
        this.canvas.width = image.width;
        this.canvas.height = image.height;
        this.context.drawImage(this.image, 0, 0, image.width, image.height);
        resolve(true);
      };
      image.onerror = () =>
        reject(new Error(`Nie udało się załadować pliku ${image.src}`));
      image.src = `${mapPath}/${this.data.file}`;
    });
  }

  renderBMP(mainContext: CanvasRenderingContext2D) {
    // this.data.offset = this.data.offset || [0, 0];
    mainContext.drawImage(
      this.canvas,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  async loadTILE(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const { tiles } = this.data;
      this.height = tiles.length;

      for (let y = 0; y < tiles.length; y++) {
        this.width = Math.max(this.width || 0, tiles[y].length);

        for (let x = 0; x < tiles[y].length; x++) {
          this.hexes[y * tiles[y].length + x] = new HexObject({
            value: tiles[y][x],
            x,
            y,
            tileset: this.data.tileset
          });
        }
      }
      resolve(true);
    });
  }

  renderTILE(mainContext: CanvasRenderingContext2D) {
    this.hexes.forEach(hex => {
      this.context.drawImage(
        hex.getGfx(),
        hex.x * hex.width,
        hex.y * hex.height,
        hex.width,
        hex.height
      );
    });
    mainContext.drawImage(
      this.canvas,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }
}
