/* eslint no-throw-literal: off */

import fs from 'fs-extra';
import { ipcMain, IpcMainEvent } from 'electron';
import Options from '../options';
import { TypeInfo } from '../../Definitions/map';

export default class MapFetch {
  static init() {
    ipcMain.on('map-list-request', (event: IpcMainEvent) =>
      event.reply('map-list-data', this.getList())
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
      fs.readdirSync(this.getMainDir).forEach((mapDir: string) => {
        const paths = this.getDirs(mapDir);

        if (
          fs.existsSync(paths.map) &&
          fs.existsSync(paths.info) &&
          fs.existsSync(paths.layout)
        ) {
          const info = { id: mapDir, ...fs.readJSONSync(paths.info) };
          maps.push(info);
        } else {
          throw `No map info for ${mapDir}`;
        }
      });
      return maps;
    }
    throw `Cannot find maps dir. ${this.getMainDir}`;
  }
}
