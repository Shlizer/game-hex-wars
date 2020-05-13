/* eslint-disable promise/always-return */
/* eslint class-methods-use-this: off */
/* eslint no-loop-func: off */
import { TilesetConfig } from '../../../Definitions/tileset';
import { TileConfig } from '../../../Definitions/tile';
import Loader from '../Loader';

export default class TilesetObject {
  config: TilesetConfig;

  constructor(cfg: TilesetConfig) {
    this.config = cfg;
  }

  async loadGfx(): Promise<unknown> {
    Loader.prepend(
      `map-tileset-load-${this.config.id}`,
      `Parsowanie tilesetu <b>${this.config.name || this.config.id}</b>`
    );
    const loadPromise = this.config.grouped
      ? this.loadSingle()
      : this.loadMultiple();
    return loadPromise.finally(() => {
      Loader.remove(`map-tileset-load-${this.config.id}`);
    });
  }

  async loadSingle(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.loadFile(`${this.config.path}/${this.config.file}`)
        .then(image => {
          // @todo: split tiles to separate canvases
          return resolve(true);
        })
        .catch(() => reject(new Error(`Cannot load file ${this.config.file}`)));
    });
  }

  async loadMultiple(): Promise<boolean> {
    return new Promise(resolve => {
      let num = 1;

      (async () => {
        do {
          const filename = `${this.config.path}/${num}.${this.config.extension}`;
          // eslint-disable-next-line no-await-in-loop
          await this.loadFile(filename)
            .then(image => {
              this.setCanvas(num.toString(), filename, image);
              num++;
            })
            .catch(() => {
              num = 0;
              resolve(true);
            });
        } while (num > 0);
      })();
    });
  }

  async loadFile(path: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(image);
      image.src = path;
    });
  }

  setCanvas(id: string, filename: string, image: HTMLImageElement) {
    if (!this.config.tiles) this.config.tiles = {};
    this.config.tiles[id] = {
      ...(this.config.tiles[id] ? this.config.tiles[id] : {}),
      file: filename,
      id
    };
    this.config.tiles[id].canvas = this.getImageCanvas(
      this.config.tiles[id],
      image
    );
  }

  getImageCanvas(tile: TileConfig, image: HTMLImageElement): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (image && context) {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      return canvas;
    }
    throw new Error(`Cannot set image context for ${tile.id}`);
  }

  getTile(tileId: string | number): TileConfig | undefined {
    return this.config.tiles?.[tileId];
  }
}
