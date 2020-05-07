import path from 'path';
import fs from 'fs-extra';
import { ipcMain, IpcMainEvent } from "electron"

const mapsPath = path.join(__dirname, '../../assets/maps')

export default class Map {
    constructor() {
        ipcMain.on("map-list-get", this.getList)
    }

    getList = (event : IpcMainEvent) => {
        if (fs.existsSync(mapsPath)) {
            const maps :{
                name: string,
                description: string,
                author: string
            }[] = []

            fs.readdirSync(mapsPath).map(mapDir => {
                if (fs.existsSync(`${mapsPath}/${mapDir}/info.json`) && fs.existsSync(`${mapsPath}/${mapDir}/layout.js`)) {
                    console.log('>>>', fs.readJSONSync(`${mapsPath}/${mapDir}/info.json`))
                    maps.push(fs.readJSONSync(`${mapsPath}/${mapDir}/info.json`))
                } else {
                    console.warn(`No map info for ${mapDir}`)
                }
            })
            event.returnValue = maps
        } else {
            console.error("Cannot find maps dir.")
        }
    }
}
