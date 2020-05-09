/* eslint class-methods-use-this: off */

import { ipcRenderer, IpcRendererEvent } from 'electron';
import { TypeInfo, TypeLayout } from '../../../Definitions/map';
import Loader from '../Loader';

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
    return new Promise(resolve => {
      Loader.add('map-load-layout', 'Schemat mapy');
      ipcRenderer.send('map-layout-request', { id: this.info.id });
      ipcRenderer.on(
        'map-layout-data',
        (_event: IpcRendererEvent, layout?: TypeLayout) => {
          if (layout) {
            console.log(layout);
            Loader.remove('map-load-layout');
            resolve(true);
          } else {
            Loader.remove('map-load-layout');
            resolve(false);
          }
        }
      );
    });
  }

  async loadTilesets(): Promise<boolean> {
    return new Promise(resolve => {
      Loader.add('map-load-tilesets', 'Dane graficzne kafli');
      ipcRenderer.send('map-layout-tilesets', { id: this.info.id });
      ipcRenderer.on(
        'map-layout-tilesets',
        (_event: IpcRendererEvent, tilesets?: []) => {
          if (tilesets) {
            console.log(tilesets);
            Loader.remove('map-load-tilesets');
            resolve(true);
          } else {
            Loader.remove('map-load-tilesets');
            resolve(false);
          }
        }
      );
    });
  }
}
