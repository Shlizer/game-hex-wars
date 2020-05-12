/* eslint class-methods-use-this: off */

import { TypeInfo, TypeLayout } from '../../../Definitions/map';
import { Tileset as TSConfig } from '../../../Definitions/tileset';
import TSManager from '../Tileset/manager';
import Loader from '../Loader';
import Fetcher from '../fetch';

export default class MapObject {
  selected = false;
  initialized = false;
  info: TypeInfo;
  layout: TypeLayout | undefined;

  constructor(info: TypeInfo) {
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
        .filter((item, pos, arr) => arr.indexOf(item) === pos);
    }
    return [];
  }

  async load(): Promise<boolean> {
    if (await this.loadMapLayout()) {
      if (await this.loadTilesets()) {
        console.log('done loading');
        return true;
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

  init() {
    this.initialized = true;
  }

  update() {
    if (!this.initialized) this.init();
  }

  render() {}
}
