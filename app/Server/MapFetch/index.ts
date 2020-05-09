import fs from 'fs-extra';
import { ipcMain, IpcMainEvent } from 'electron';
import Store from '../../Store';
import Map from '../../Store/map';
import { MapInfoConfig } from '../../Store/definitions';

export default class MapFetch {
    constructor() {
        ipcMain.on('map-list-request', (event : IpcMainEvent) => {
            event.reply('map-list-data', this.getList())
        })
    }

   getList(): MapInfoConfig[] {
        const mapsPath = Store.dirs.map;
        Store.clearMaps()

        if (fs.existsSync(mapsPath)) {
            fs.readdirSync(mapsPath).map((mapDir: string) => Store.addMap(new Map(mapDir)))
            return Store.getMapsInfo()
        } else {
            throw(`Cannot find maps dir. ${Store.dirs.map}`)
        }
    }
}
