/* eslint-disable no-multi-assign */
/* eslint class-methods-use-this: off */

import { Size } from '../../../Definitions/helper';
import { getMapSize } from './helper';
import { MapInfo, MapLayout } from '../../../Definitions/map';
import { TilesetConfig } from '../../../Definitions/tileset';
import State from '../Engine/state';
import TSManager from '../Tileset/manager';
import Loader from '../Loader';
import Fetcher from '../fetch';
import Layer from './layer';

export default class MapObject {
  selected = false;
  loaded = false;

  info: MapInfo;
  path: number[][] = [];
  layers: Layer[] = [];
  layout?: MapLayout;

  size: Size = { w: 0, h: 0 };

  constructor(info: MapInfo) {
    this.info = info;
  }

  async select(): Promise<boolean> {
    return this.load()
      .then(loaded => {
        if (loaded && this.layout) {
          State.hex.size = this.layout.hex;
          State.map.offset = this.layout.offset;
          State.map.size.hex = this.layout.size;
          // @todo: get size from layers
          State.map.size.px = {
            ...getMapSize(
              State.map.size.hex.w,
              State.map.size.hex.h,
              State.hex.size.w,
              State.hex.size.h
            )
          };
          State.map.size.full.w =
            State.map.size.px.w +
            State.map.offset.left +
            State.map.offset.right;
          State.map.size.full.h =
            State.map.size.px.h +
            State.map.offset.top +
            State.map.offset.bottom;

          State.map.selected = this.info.id;
          this.selected = true;
          return true;
        }
        throw new Error('Cannot load and select map');
      })
      .catch(err => {
        throw err;
      });
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
          this.loadPaths();
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

  loadPaths() {
    this.path = [];
    for (let x = 0; x < (this.layout?.size?.h || 0); x++) {
      this.path[x] = [];
      for (let y = 0; y < (this.layout?.size?.w || 0); y++) {
        this.path[x][y] =
          this.layout?.path?.[x]?.[y] === undefined
            ? 1
            : this.layout?.path?.[x]?.[y];
      }
    }
  }
}
