/* eslint class-methods-use-this: off */

import { TypeInfo, TypeLayout } from '../../../Definitions/map';
import { Tileset as TSConfig } from '../../../Definitions/tileset';
import TSManager from '../Tileset/manager';
import Loader from '../Loader';
import Fetcher from '../fetch';
import Layer from './layer';

export default class MapObject {
  selected = false;
  loaded = false;
  info: TypeInfo;
  layout?: TypeLayout;

  canvas: HTMLCanvasElement;
  layers: Layer[] = [];

  constructor(info: TypeInfo) {
    this.canvas = document.createElement('canvas');
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
          console.log('MAP LOADED');
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
    const callback = (layout: TypeLayout, resolve: (v: boolean) => void) => {
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
    const callback = (tilesets: TSConfig[], resolve: (v: boolean) => void) => {
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

        this.layout.layers.forEach(async layerData => {
          const layer = new Layer(layerData);
          const layerPromise = layer.load(this.info.path || '');
          promises.push(layerPromise);
          layerPromise
            .then(() => this.layers.push(layer))
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

  render(mainContext: CanvasRenderingContext2D) {
    this.layers.map(layer => layer.render(mainContext));
  }
}
