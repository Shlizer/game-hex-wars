import fs from 'fs-extra';
import { ipcMain, IpcMainEvent } from 'electron';
import Store from '../../Store';
import { MapConfig } from '../../Store/definitions';

export default class Map {
    maps: MapConfig = []

    constructor() {
        ipcMain.on("map-list-get", (event : IpcMainEvent) => {
            this.getList()
            .then(maps => (event.returnValue = maps))
            .catch(error => console.error(error))
        })
    }

   getList(): Promise<MapConfig> {
        return new Promise<MapConfig>( (resolve, reject) => {
            const mapsPath = Store.dirs.map;
            this.maps = [];

            if (fs.existsSync(mapsPath)) {
                fs.readdirSync(mapsPath).map(mapDir => {
                    if (fs.existsSync(`${mapsPath}/${mapDir}/info.json`) && fs.existsSync(`${mapsPath}/${mapDir}/layout.json`)) {
                        this.maps.push({
                            info: fs.readJSONSync(`${mapsPath}/${mapDir}/info.json`),
                            layout: fs.readJSONSync(`${mapsPath}/${mapDir}/layout.json`)
                        })
                    } else {
                        console.warn(`No map info for ${mapDir}`)
                    }
                })
                resolve(this.maps)
            } else {
                reject(`Cannot find maps dir. ${Store.dirs.map}`)
            }
        })
    }
}
