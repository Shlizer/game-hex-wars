import { Hex } from "../Hex/index.js"

export class Tileset {
    static sets = {}

    static getDir(...subdirs) {
        return window.assetsDir + 'tilesets/' + subdirs.join('/')
    }

    static load(name) {
        try {
            const conf = require(Tileset.getDir(name, 'info.json'))
            if (!Tileset.sets[conf.name]) {
                Tileset.sets[name] = {
                    name: conf.name,
                    alpha: conf.alphaColor || null,
                    offset: conf.offset || [0, 0],
                    size: conf.size || { width: 30, height: 30 },
                    tiles: {}
                }
                return true
            }
        } catch (e) {
            console.error("Could not load tileset.")
        }
        return false
    }

    static getTile(tileset, tileName) {
        if (Tileset.sets[tileset]) {
            if (Tileset.sets[tileset].tiles[tileName]) {
                return Tileset.sets[tileset].tiles[tileName]
            } else {
                const img = new Image()
                img.src = Tileset.getDir(tileset, tileName + '.png')
                Tileset.sets[tileset].tiles[tileName] = this.getTileData(tileset, tileName, img)
                img.onload = () => this.onLoadTile(Tileset.sets[tileset].tiles[tileName], Tileset.sets[tileset].alpha)
                return Tileset.sets[tileset].tiles[tileName]
            }
        } else {
            console.error(`Tileset ${tileset} wasn't loaded yet`)
            return Tileset.load(tileset)
                ? Tileset.getTile(tileset, tileName)
                : null
        }
    }

    static getTileData(tileset, name, img) {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        context.drawImage(img, 0, 0, Tileset.sets[tileset].size.width, Tileset.sets[tileset].size.height)

        return {
            tileset,
            name,
            img: canvas,
            alpha: Tileset.sets[tileset].alpha,
            offset: Tileset.sets[tileset].offset,
        }
    }

    static onLoadTile(data, alpha = null) {
        if (alpha) {
            //console.log(data.img)
        }
        data.loaded = true
    }
}