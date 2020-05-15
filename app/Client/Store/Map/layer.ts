/* eslint-disable react/static-property-placement */
import { LayerConfig, LayerType } from '../../../Definitions/layer';
import { loop } from '../Engine/state';
import WithContext from '../_withContext';
import LoopControler from '../_loopControl';
import HexObject from './hex';
import { getMapSize } from './helper';

export default class LayerObject extends WithContext implements LoopControler {
  data: LayerConfig;
  image?: HTMLImageElement;
  hexes: HexObject[] = [];
  width?: number;
  height?: number;

  constructor(data: LayerConfig) {
    super();
    this.data = data;
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

  render(): CanvasRenderingContext2D {
    if (!loop.shouldRedraw) return this.context;
    this.setAlpha(this.data.alpha);

    if (this.data.type === LayerType.BMP && this.image) {
      return this.renderBMP();
    }
    if (this.data.type === LayerType.TILE) {
      return this.renderTILE();
    }
    return this.context;
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

  renderBMP(): CanvasRenderingContext2D {
    return this.context;
  }

  async loadTILE(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const { tiles } = this.data;
      this.getLayerSize(tiles);

      for (let y = 0; y < tiles.length; y++) {
        for (let x = 0; x < tiles[y].length; x++) {
          if (tiles[y][x])
            this.hexes[y * (this.width || 0) + x] = new HexObject({
              value: tiles[y][x],
              x,
              y,
              tileset: this.data.tileset
            });
        }
      }
      // @todo: get size from hexes
      const size = getMapSize(this.width, this.height, 128, 110);
      this.canvas.width = size.width;
      this.canvas.height = size.height;
      resolve(true);
    });
  }

  getLayerSize(tiles: (string | number)[][]) {
    this.height = tiles.length;

    for (let y = 0; y < tiles.length; y++) {
      this.width = Math.max(this.width || 0, tiles[y].length);
    }
  }

  renderTILE(): CanvasRenderingContext2D {
    this.hexes.forEach(hex => {
      this.context.drawImage(
        hex.getGfx(),
        hex.getPositionX(),
        hex.getPositionY(),
        hex.getWidth(),
        hex.getHeight()
      );
    });
    return this.context;
  }
}
