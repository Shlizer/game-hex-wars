import { AppConfig, StoreDirs, MapInfoConfig } from './definitions';
import Map from './map';

class Store {
    static store: Store | undefined
    debug: Boolean = false
    dirs: StoreDirs = { asset: '', map: '', tileset: '' }
    maps: Map[] = []

    constructor() {
        Store.store = this
    }

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

    currentMap(): Map | undefined {
        console.log(this.maps.find(map => map.selected === true))
        return this.maps.find(map => map.selected === true)
    }

    clearMaps() {
        console.log('clearMaps')
        if (!this.currentMap()) {
            this.maps = []
        }
    }

    addMap(map: Map) {
        console.log('addMap', map.id)
        this.maps.push(map)
    }

    selectMap(id: string) {
        console.log('SELECTING MAP: ', id, this.maps)
        this.maps.forEach(map => console.log(map.id))
        this.maps.forEach(map => map.id === id ? map.select() : map.deselect())
    }

    getMapsInfo(): MapInfoConfig[] {
        return this.maps.map(mapObj => mapObj.getInfo())
    }
}

const store = Store.store || new Store()
export default store