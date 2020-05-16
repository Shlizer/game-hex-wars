import { action, decorate, observable } from 'mobx';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import { MapInfo } from '../../../Definitions/map';
import Map from './map';
import Loader from '../Loader';

export default class MapManager {
  static current?: Map;
  list: Map[] = [];

  constructor() {
    this.loadList();
  }

  loadList() {
    Loader.add('map-list', 'Trwa ładowanie listy map');
    ipcRenderer.send('map-list-request');
    ipcRenderer.on(
      'map-list-data',
      (_event: IpcRendererEvent, maps: MapInfo[]) => {
        this.addMaps(maps);
        Loader.remove('map-list');
      }
    );
  }

  addMaps(maps: MapInfo[]) {
    this.list.length = 0;
    maps.forEach(info => this.addMap(info));
  }

  addMap(info: MapInfo) {
    this.list.push(new Map(info));
  }

  deselectAll() {
    this.list.forEach(map => map.deselect());
  }

  select(id: string) {
    const current = this.list.find(mapObj => mapObj.info.id === id);

    if (current) {
      current
        .select()
        .then(() => {
          MapManager.current = current;
          return true;
        })
        .catch((error: Error) => {
          MapManager.current = undefined;
          this.deselectAll();
          throw error;
        });
    }
  }
}

decorate(MapManager, {
  addMaps: action,
  list: observable
});
