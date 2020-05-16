/* eslint no-throw-literal: off */

import fs from 'fs-extra';
import { ipcMain, IpcMainEvent } from 'electron';
import Options from '../options';
import ErrorHandler from '../Error';
import { MapInfo, MapLayout } from '../../Definitions/map';
import { LayerType } from '../../Definitions/layer';

export default class MapFetch {
  static init() {
    ipcMain.on('map-list-request', (event: IpcMainEvent) =>
      event.reply('map-list-data', MapFetch.getList())
    );
    ipcMain.on('map-layout-request', (event: IpcMainEvent, { id }) =>
      event.reply('map-layout-data', MapFetch.getLayout(id))
    );
  }

  static get getMainDir(): string {
    return Options.dir.map;
  }

  static getDirs(id: string): { map: string; info: string; layout: string } {
    return {
      map: `${MapFetch.getMainDir}/${id}`,
      info: `${MapFetch.getMainDir}/${id}/info.json`,
      layout: `${MapFetch.getMainDir}/${id}/layout.json`
    };
  }

  static getList(): MapInfo[] {
    const maps: MapInfo[] = [];

    if (fs.existsSync(MapFetch.getMainDir)) {
      fs.readdirSync(MapFetch.getMainDir).forEach((mapId: string) => {
        const paths = MapFetch.getDirs(mapId);

        if (
          fs.existsSync(paths.map) &&
          fs.existsSync(paths.info) &&
          fs.existsSync(paths.layout)
        ) {
          maps.push({
            ...{ id: mapId, path: paths.map },
            ...MapFetch.getInfoData({
              ...fs.readJSONSync(paths.info),
              id: mapId,
              path: paths.map
            })
          });
        } else {
          ErrorHandler.send(new Error(`No map info for ${mapId}`));
        }
      });
      return maps;
    }
    ErrorHandler.send(
      new Error(`Cannot find maps dir. ${MapFetch.getMainDir}`)
    );
    return [];
  }

  static getLayout(id: string): MapLayout | null {
    if (fs.existsSync(MapFetch.getMainDir)) {
      const paths = MapFetch.getDirs(id);
      if (fs.existsSync(paths.map) && fs.existsSync(paths.layout)) {
        return MapFetch.getLayoutData(fs.readJSONSync(paths.layout));
      }
      ErrorHandler.send(new Error(`No map info for ${id}`));
      return null;
    }
    ErrorHandler.send(
      new Error(`Cannot find maps dir. ${MapFetch.getMainDir}`)
    );
    return null;
  }

  static getInfoData(info: MapInfo): MapInfo {
    return { ...{ name: '', description: '', author: '', tags: [] }, ...info };
  }

  static getLayoutData(layout: MapLayout): MapLayout {
    const defaultOffset = { top: 0, left: 0, right: 0, bottom: 0 };

    layout.size = { ...{ w: 0, h: 0 }, ...(layout.size || {}) };
    layout.hex = { ...{ w: 0, h: 0 }, ...(layout.hex || {}) };
    layout.offset = { ...defaultOffset, ...(layout.offset || {}) };
    if (layout.layers) {
      layout.layers = layout.layers.map(layer => {
        layer.alpha = layer.alpha !== undefined ? layer.alpha : 1;
        if (layer.type === LayerType.BMP) {
          layer.offset = { ...defaultOffset, ...(layer.offset || {}) };
        } else if (layer.type === LayerType.TILE) {
          layer.tiles = layer.tiles || [];
        }
        return layer;
      });
    } else {
      layout.layers = [];
    }
    layout.path = layout.path || [];
    return layout;
  }
}
