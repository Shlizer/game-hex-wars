/* eslint no-throw-literal: off */

import fs from 'fs-extra';
import { ipcMain, IpcMainEvent } from 'electron';
import Options from '../options';
import ErrorHandler from '../Error';
import { TypeInfo, TypeLayout } from '../../Definitions/map';

export default class MapFetch {
  static init() {
    ipcMain.on('map-list-request', (event: IpcMainEvent) =>
      event.reply('map-list-data', this.getList())
    );
    ipcMain.on('map-layout-request', (event: IpcMainEvent, { id }) =>
      event.reply('map-layout-data', this.getLayout(id))
    );
  }

  static get getMainDir(): string {
    return Options.dir.map;
  }

  static getDirs(id: string): { map: string; info: string; layout: string } {
    return {
      map: `${this.getMainDir}/${id}`,
      info: `${this.getMainDir}/${id}/info.json`,
      layout: `${this.getMainDir}/${id}/layout.json`
    };
  }

  static getList(): TypeInfo[] {
    const maps: TypeInfo[] = [];

    if (fs.existsSync(this.getMainDir)) {
      fs.readdirSync(this.getMainDir).forEach((mapId: string) => {
        const paths = this.getDirs(mapId);

        if (
          fs.existsSync(paths.map) &&
          fs.existsSync(paths.info) &&
          fs.existsSync(paths.layout)
        ) {
          const info = {
            ...fs.readJSONSync(paths.info),
            id: mapId,
            path: paths.map
          };
          maps.push(info);
        } else {
          ErrorHandler.send(new Error(`No map info for ${mapId}`));
        }
      });
      return maps;
    }
    ErrorHandler.send(new Error(`Cannot find maps dir. ${this.getMainDir}`));
    return [];
  }

  static getLayout(id: string): TypeLayout | null {
    if (fs.existsSync(this.getMainDir)) {
      const paths = this.getDirs(id);
      if (fs.existsSync(paths.map) && fs.existsSync(paths.layout)) {
        return fs.readJSONSync(paths.layout);
      }
      ErrorHandler.send(new Error(`No map info for ${id}`));
      return null;
    }
    ErrorHandler.send(new Error(`Cannot find maps dir. ${this.getMainDir}`));
    return null;
  }
}
