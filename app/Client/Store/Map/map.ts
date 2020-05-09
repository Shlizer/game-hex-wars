/* eslint class-methods-use-this: off */

import { TypeInfo } from '../../../Definitions/map';
import Loader from '../Loader';

export default class MapObject {
  selected = false;

  info: TypeInfo;

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

  load() {
    this.loadMapLayout()
      .then(() => this.loadTilesets())
      .catch(e => console.error(e));
  }

  loadMapLayout(): Promise<unknown> {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve(this.info);
      }, 1500);
    });
    Loader.add('map-load-layout', 'Schemat mapy', promise);
    return promise;
  }

  loadTilesets() {
    Loader.add('map-load-tilesets', 'Dane graficzne kafli');
    setTimeout(() => {
      Loader.remove('map-load-tilesets');
    }, 1500);
  }
}
