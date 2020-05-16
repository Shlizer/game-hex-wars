/* eslint no-throw-literal: off */

import fs from 'fs-extra';
import { ipcMain, IpcMainEvent } from 'electron';
import Options from '../options';
import ErrorHandler from '../Error';
import { TilesetConfig } from '../../Definitions/tileset';

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

  // @todo: load tilesets from map's dir if they exist there
  static getList(_id: string, tilesets: string[]): TilesetConfig[] {
    const list: TilesetConfig[] = [];

    if (fs.existsSync(this.getMainDir)) {
      tilesets.forEach((tsName: string) => {
        const paths = this.getDirs(tsName);

        if (fs.existsSync(paths.tileset) && fs.existsSync(paths.info)) {
          list.push({
            ...{ id: tsName, path: paths.tileset },
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

  static getConfig(info: TilesetConfig): TilesetConfig {
    const defaultSize = { w: 0, h: 0 };
    const defaultOffset = { top: 0, left: 0, right: 0, bottom: 0 };

    info = { ...{ name: '', description: '', author: '' }, ...info };
    info.hex = { ...defaultSize, ...(info.hex || {}) };
    info.offset = { ...defaultOffset, ...(info.offset || {}) };

    if (info.tiles) {
      Object.keys(info.tiles).forEach(tileId => {
        info.tiles[tileId] = {
          ...{ name: '', description: '' },
          ...info.tiles[tileId]
        };
        info.tiles[tileId].hex = {
          ...defaultSize,
          ...(info.tiles[tileId].hex || {})
        };
        info.tiles[tileId].offset = {
          ...defaultOffset,
          ...(info.tiles[tileId].offset || {})
        };
      });
    } else {
      info.tiles = {};
    }
    return info;
  }
}
