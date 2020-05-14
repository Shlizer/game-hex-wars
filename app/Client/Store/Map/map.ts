/* eslint-disable no-multi-assign */
/* eslint class-methods-use-this: off */

import { decorate, observable } from 'mobx';
import { SizeStrict } from '../../../Definitions/helper';
import { getMapSize } from './helper';
import { MapInfo, MapLayout } from '../../../Definitions/map';
import { LayerType } from '../../../Definitions/layer';
import { TilesetConfig } from '../../../Definitions/tileset';
import WithContext from '../_withContext';
import LoopControler from '../_loopControl';
import TSManager from '../Tileset/manager';
import Loader from '../Loader';
import Fetcher from '../fetch';
import Layer from './layer';
import LoopControl from '../Engine/loopControl';

export default class MapObject extends WithContext implements LoopControler {
  selected = false;
  loaded = false;
  info: MapInfo;
  layout?: MapLayout;
  size: SizeStrict = { width: 0, height: 0 };
  layers: Layer[] = [];

  constructor(info: MapInfo) {
    super();
    this.info = info;
  }

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }

  getTilesets(): string[] {
    if (this.layout) {
      return this.layout.layers
        .map(layer => layer.tileset)
        .filter(tileset => tileset)
        .filter((item, pos, arr) => arr.indexOf(item) === pos);
    }
    return [];
  }

  async load(): Promise<boolean> {
    if (await this.loadMapLayout()) {
      if (await this.loadTilesets()) {
        if (await this.loadLayers()) {
          this.loaded = true;
          return true;
        }
      }
    }
    return false;
  }

  async loadMapLayout(): Promise<boolean> {
    const before = () => Loader.add('map-load-layout', 'Schemat mapy');
    const final = () => Loader.remove('map-load-layout');
    const callback = (layout: MapLayout, resolve: (v: boolean) => void) => {
      this.layout = layout;
      // @todo: get size from layers
      this.size = getMapSize(
        this.layout.size.width,
        this.layout.size.height,
        this.layout.hex.width,
        this.layout.hex.height
      );

      this.canvas.width =
        this.size.width +
        (this.layout.offset?.left || 0) +
        (this.layout.offset?.right || 0);
      this.canvas.height =
        this.size.height +
        (this.layout.offset?.top || 0) +
        (this.layout.offset?.bottom || 0);
      resolve(!!layout);
    };

    return Fetcher.create({
      key: 'map-layout',
      data: { id: this.info.id },
      final,
      before,
      callback
    });
  }

  async loadTilesets(): Promise<boolean> {
    const before = () => Loader.add('map-load-tsets', 'Dane graficzne kafli');
    const final = () => Loader.remove('map-load-tsets');
    const callback = (
      tilesets: TilesetConfig[],
      resolve: (v: boolean) => void
    ) => {
      TSManager.load(tilesets)
        .then(() => resolve(!!tilesets))
        .catch((err: Error) =>
          document.dispatchEvent(new CustomEvent('app-error', { detail: err }))
        );
    };

    return Fetcher.create({
      key: 'map-tilesets',
      data: { id: this.info.id, tilesets: this.getTilesets() },
      final,
      before,
      callback
    });
  }

  async loadLayers(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      Loader.add('map-load-layouts', 'Dane graficzne layoutów');

      if (this.layout?.layers) {
        const promises: Promise<boolean>[] = [];

        this.layout.layers.forEach(async (layerData, index) => {
          const layer = new Layer(layerData);
          const layerPromise = layer.load(this.info.path || '');
          promises.push(layerPromise);
          layerPromise
            .then(() => {
              this.layers[index] = layer;
              return true;
            })
            .catch(err => reject(err));
        });
        Promise.all(promises)
          .then(() => resolve(true))
          .catch(() => reject(new Error('Błąd ładowania warstwy mapy')));
      } else {
        reject(new Error('Mapa nie ma żadnych warstw'));
      }
    }).finally(() => Loader.remove('map-load-layouts'));
  }

  update(time: number) {
    this.layers.map(layer => layer.update(time));
  }

  render(_mainContext: CanvasRenderingContext2D): CanvasRenderingContext2D {
    if (!LoopControl.shouldRedraw) return this.context;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.layers.forEach(this.renderLayer);

    return this.context;
  }

  renderLayer = (layer: Layer) => {
    const layerCtx = layer.render();
    this.context.drawImage(
      layerCtx.canvas,
      layer.data.type !== LayerType.BMP ? this.layout?.offset?.left || 0 : 0,
      layer.data.type !== LayerType.BMP ? this.layout?.offset?.top || 0 : 0
    );
  };
}

decorate(MapObject, {
  size: observable
});
