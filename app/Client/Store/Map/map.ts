/* eslint class-methods-use-this: off */

import { TypeInfo, TypeLayout } from '../../../Definitions/map';
import Loader from '../Loader';
import Fetcher from '../fetch';

export default class MapObject {
  selected = false;

  info: TypeInfo;

  layout: TypeLayout | undefined;

  constructor(info: TypeInfo) {
    this.info = info;
  }

  select() {
    this.selected = true;
  }

  deselect() {
    // this.unload();
    this.selected = false;
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
    const callback = (layout: unknown, resolve: (v: boolean) => unknown) => {
      console.log(layout);
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
    const callback = (tilesets: unknown, resolve: (v: boolean) => unknown) => {
      console.log(tilesets);
      resolve(!!tilesets);
    };

    return Fetcher.create({
      key: 'map-tilesets',
      data: { id: this.info.id },
      final,
      before,
      callback
    });
  }
}
