/* eslint no-throw-literal: off */

import fs from 'fs-extra';
import { ipcMain, IpcMainEvent } from 'electron';
import Options from '../options';
import ErrorHandler from '../Error';
import { Config } from '../../Definitions/tileset';

export default class TilesetFetch {
  static init() {
    ipcMain.on(
      'map-tilesets-request',
      (event: IpcMainEvent, { id, tilesets }) =>
        event.reply('map-tilesets-data', this.getList(id, tilesets))
    );
  }

  static get getMainDir(): string {
    return Options.dir.tileset;
  }

  static getDirs(id: string): { tileset: string; info: string } {
    return {
      tileset: `${this.getMainDir}/${id}`,
      info: `${this.getMainDir}/${id}/info.json`
    };
  }

  static getList(id: string, tilesets: string[]): Config[] {
    const list: Config[] = [];

    if (fs.existsSync(this.getMainDir)) {
      tilesets.forEach((tsName: string) => {
        console.log('getting ', tsName);
        const paths = this.getDirs(tsName);

        if (fs.existsSync(paths.tileset) && fs.existsSync(paths.info)) {
          const info = fs.readJSONSync(paths.info);
          list.push(info);
        } else {
          ErrorHandler.send(new Error(`No tileset info for ${tsName}`));
        }
      });
      return list;
    }
    ErrorHandler.send(new Error(`Cannot find tileset dir. ${this.getMainDir}`));
    return [];
  }
}
