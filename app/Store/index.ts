import { AppConfig, StoreDirs } from './definitions';

class Store {
    debug: Boolean = false
    dirs: StoreDirs = { asset: '', map: '', tileset: '' }

    setCfg(data : AppConfig) {
        if (data.debug !== undefined) this.debug = data.debug
        if (data.assetDir) this.dirs.asset = this.getDir(data.assetDir)
        if (data.mapDir) this.dirs.map = this.getDir(data.mapDir)
        if (data.tilesetDir) this.dirs.tileset = this.getDir(data.tilesetDir)
    }

    getDir(dir : string) : string {
        dir = dir.replace('%MAIN_PATH%', __dirname + '/../..');
        dir = dir.replace('%ASSET_DIR%', this.dirs.asset);
        return dir;
    }
}

const store = new Store()
export default store