import { Hex } from "../Hex/index.js"
import { Tileset } from '../Tileset/index.js'

export class Layer {
    changed = true
    hexes = []
    size = { width: 0, height: 0 } // size of map in tiles
    hex = { width: 0, height: 0, border: 0 } // size of each tile

    constructor({ name, tileset, tiles }, hex) {
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.name = name
        this.tileset = tileset
        this.tiles = tiles
        this.hex = hex
        Tileset.load(tileset)
        this.loadHexes()
    }

    update() { }

    render(upperContext) {
        this.drawHexes(upperContext)
    }

    loadHexes(upperContext) {
        this.size.height = this.tiles.length
        for (let y = 0; y < this.tiles.length; ++y) {
            this.size.width = Math.max(this.size.width, this.tiles[y].length)
            for (let x = 0; x < this.tiles[y].length; ++x) {
                this.hexes[y * this.tiles[y].length + x] = new Hex({
                    canvas: this.canvas,
                    ...this.hex,
                    x, y,
                    tileset: this.tileset,
                    gfx: this.tiles[y][x]
                })
            }
        }
    }

    drawHexes(upperContext) {
        if (this.changed) {
            console.time('>')
            this.canvas.width = upperContext.canvas.width
            this.canvas.height = upperContext.canvas.height
            this.context.clearRect(0, 0, this.size[0], this.size[1])
            this.changed = this.hexes.reduce((prev, hex) => hex.render(this.context), this.changed)
            console.timeEnd('>')
        }

        upperContext.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height)
    }
}