/* eslint-disable promise/always-return */
/* eslint class-methods-use-this: off */
/* eslint no-loop-func: off */
import {
  Tileset as TSConfig,
  Tile as TConfig
} from '../../../Definitions/tileset';
import Loader from '../Loader';

export default class TilesetObject {
  config: TSConfig;

  constructor(cfg: TSConfig) {
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
    return loadPromise.finally(() =>
      Loader.remove(`map-tileset-load-${this.config.id}`)
    );
  }

  async loadSingle(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.loadFile(`${this.config.path}/${this.config.file}`)
        .then(image => {
          this.config.image = image;
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
              this.setImage(num.toString(), filename, image);
              // eslint-disable-next-line no-plusplus
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

  setImage(id: string, filename: string, image: HTMLImageElement) {
    if (!this.config.tiles) this.config.tiles = {};
    this.config.tiles[id] = {
      ...(this.config.tiles[id] ? this.config.tiles[id] : {}),
      file: filename,
      id,
      image
    };
    this.config.tiles[id].imageData = this.getImageData(this.config.tiles[id]);
  }

  getImageData(tile: TConfig): ImageData | undefined {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (tile.image && context) {
      canvas.width = tile.image.width;
      canvas.height = tile.image.height;
      context.drawImage(tile.image, 0, 0);
      return context.getImageData(0, 0, canvas.width, canvas.height);
    }
    throw new Error(`Cannot set image context for ${tile.id}`);
  }
}
