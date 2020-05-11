/* eslint no-throw-literal: off */

import fs from 'fs-extra';
import { ipcMain, IpcMainEvent } from 'electron';
import Options from '../options';
import ErrorHandler from '../Error';
import { Config } from '../../Definitions/tileset';

const defaults = {
  main: {
    name: '',
    description: '',
    author: '',
    grouped: true,
    file: 'tileset.png',
    extension: 'png'
  },
  offset: { top: 0, left: 0, right: 0, bottom: 0 },
  tiles: { name: '', description: '' }
};

export default class TSFetch {
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
        const paths = this.getDirs(tsName);

        if (fs.existsSync(paths.tileset) && fs.existsSync(paths.info)) {
          list.push({
            id: tsName,
            path: paths.tileset,
            ...TSFetch.getConfig(fs.readJSONSync(paths.info))
          });
        } else {
          ErrorHandler.send(new Error(`No tileset info for ${tsName}`));
        }
      });
      return list;
    }
    ErrorHandler.send(new Error(`Cannot find tileset dir. ${this.getMainDir}`));
    return [];
  }

  static getConfig(info: Config): Config {
    const custom: Config = {
      ...defaults.main,
      ...info,
      offset: { ...defaults.offset, ...(info.offset || {}) }
    };
    if (!custom.grouped && custom.tiles) {
      custom.tiles = custom.tiles.map(tile => ({ ...defaults.tiles, ...tile }));
    }
    return custom;
  }
}
