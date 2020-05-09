import {TypeApp, TypeDirs} from '../Definitions/app';

export default class Options {
   static debug: Boolean = false
   static dir: TypeDirs = { asset: '', map: '', tileset: '' }
    
    static setCfg(data : TypeApp) {
        if (data.debug !== undefined) this.debug = data.debug
        if (data.dir) {
            if (data.dir.asset) this.dir.asset = this.createDir(data.dir.asset)
            if (data.dir.map) this.dir.map = this.createDir(data.dir.map)
            if (data.dir.tileset) this.dir.tileset = this.createDir(data.dir.tileset)
        }
    }

    static createDir(dir : string) : string {
        dir = dir.replace('%MAIN_PATH%', __dirname + '/../..');
        dir = dir.replace('%ASSET_DIR%', this.dir.asset);
        return dir;
    }

    static assetDir() {
        return this.dir.asset
    }

    static mapDir() {
        return this.dir.map
    }

    static tilesetDir() {
        return this.dir.tileset
    }
}
