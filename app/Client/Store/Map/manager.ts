import { action, decorate, observable } from 'mobx';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import { TypeInfo } from '../../../Definitions/map';
import Map from './map';

export default class MapManager {
  list: Map[] = [];

  constructor() {
    ipcRenderer.send('map-list-request');
    ipcRenderer.on(
      'map-list-data',
      (event: IpcRendererEvent, maps: TypeInfo[]) => this.addMaps(maps)
    );
  }

  addMaps(maps: TypeInfo[]) {
    this.list.length = 0;
    maps.forEach(info => this.addMap(info));
  }

  addMap(info: TypeInfo) {
    this.list.push(new Map(info));
  }

  deselectAll() {
    this.list.forEach(map => map.deselect());
  }

  select(id: string): Map | undefined {
    const map = this.list.find(mapObj => mapObj.info.id === id);
    if (map) map.select();
    return map;
  }
}

decorate(MapManager, {
  addMaps: action,
  list: observable
});