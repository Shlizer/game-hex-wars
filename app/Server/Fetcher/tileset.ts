/* eslint no-throw-literal: off */

import fs from 'fs-extra';
import { ipcMain, IpcMainEvent } from 'electron';
import Options from '../options';
import ErrorHandler from '../Error';
import { TilesetConfig, TilesetConfigOut } from '../../Definitions/tileset';
import { getSize, getOffset } from './helper';

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

  static getConfig(info: TilesetConfigOut): TilesetConfig {
    const newInfo: TilesetConfig = {
      grouped: info.grouped,
      name: info.name || '',
      file: info.file || '',
      description: info.description || '',
      author: info.author || '',
      extension: info.extension || 'png',
      hex: getSize(info.hex),
      offset: getOffset(info.offset),
      tiles: {}
    };

    if (info.tiles) {
      Object.keys(info.tiles).forEach((tileId: string | number) => {
        if (info.tiles && info.tiles[tileId]) {
          newInfo.tiles[tileId] = {
            name: info.tiles[tileId].name || '',
            file: info.tiles[tileId].file || '',
            description: info.tiles[tileId].description || '',
            hex: getSize(info.hex, info.tiles[tileId].hex),
            offset: getOffset(info.offset, info.tiles[tileId].offset)
          };
        }
      });
    }
    return newInfo;
  }
}
