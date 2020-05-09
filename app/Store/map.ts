import fs from 'fs-extra';
import { MapInfoConfig, MapLayoutConfig } from './definitions';
import Store from '../Store';

export default class Map {
    id: string;
    info: MapInfoConfig;
    selected: Boolean = false;
    layout: MapLayoutConfig | null = null;
    loaded: Boolean = false;

    constructor(id: string) {
        const pathMaps = Store.dirs.map
        const pathMap = this.id = `${pathMaps}/${id}`
        const pathInfo = `${pathMap}/info.json`
        const pathLayout = `${pathMap}/layout.json`

        if (fs.existsSync(pathMaps) && fs.existsSync(pathMap) && fs.existsSync(pathInfo) && fs.existsSync(pathLayout)) {
            this.info = Object.assign({}, {id: this.id, ...fs.readJSONSync(pathInfo)})
        } else {
            throw(`No map info for ${this.id}`)
        }
    }

    getInfo(): MapInfoConfig {
        return this.info;
    }

    select() {
        this.selected = true;
    }

    deselect() {
        this.selected = false;
    }

    load() {
        this.loaded = true;
    }

    unload() {
        this.layout = null;
        this.loaded = false;
    }
}
