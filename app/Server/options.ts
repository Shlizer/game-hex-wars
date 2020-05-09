import { TypeApp, TypeDirs } from '../Definitions/app';

export default class Options {
  static debug = false;

  static dir: TypeDirs = { asset: '', map: '', tileset: '' };

  static setCfg(data: TypeApp) {
    Options.debug = Boolean(data.debug);
    if (data.dir) {
      if (data.dir.asset) Options.dir.asset = Options.createDir(data.dir.asset);
      if (data.dir.map) Options.dir.map = Options.createDir(data.dir.map);
      if (data.dir.tileset)
        Options.dir.tileset = Options.createDir(data.dir.tileset);
    }
  }

  static createDir(dir: string): string {
    dir = dir.replace('%MAIN_PATH%', `${__dirname}/../..`);
    dir = dir.replace('%ASSET_DIR%', Options.dir.asset);
    return dir;
  }

  static assetDir() {
    return Options.dir.asset;
  }

  static mapDir() {
    return Options.dir.map;
  }

  static tilesetDir() {
    return Options.dir.tileset;
  }
}
