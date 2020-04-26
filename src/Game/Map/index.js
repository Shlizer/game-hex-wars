import { Hex } from "./Hex/index.js"

export class Map {
    changed = true
    size = {
        canvas: { width: 0, height: 0 }, // size of map canvas (in pixels)
        map: { width: 0, height: 0 }, // size of map in tiles
        hex: { width: 0, height: 0, border: 2 } // size of each tile
    }

    hexes = []

    constructor(hexSize = 30, map = [5, 5]) {
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.calculateSizes(hexSize, map)
        this.populateMap()
    }

    update() { }

    render(upperContext) {
        this.showHexes(upperContext);
    }

    calculateSizes(hexSize, map) {
        this.size.hex.width = hexSize * 2
        this.size.hex.height = hexSize * Math.sqrt(3)
        this.size.map.width = map[0]
        this.size.map.height = map[1]
        const mapSize = this.getMapSize()
        this.size.canvas.width = this.canvas.width = mapSize[0]
        this.size.canvas.height = this.canvas.height = mapSize[1]
        console.log('HEX', this.size.hex)
        console.log('MAP', mapSize)
    }

    getMapSize() {
        return [
            (this.size.hex.border) + (this.size.map.width * this.size.hex.width * 0.75) + (this.size.hex.width * 0.25),
            (this.size.hex.border * 2) + (this.size.map.height * this.size.hex.height) + (this.size.map.width > 1 ? this.size.hex.height / 2 : 0)
        ]
    }

    populateMap() {
        for (let y = 0; y < this.size.map.height; ++y) {
            for (let x = 0; x < this.size.map.width; ++x) {
                this.hexes[y * this.size.map.width + x] = new Hex({
                    canvas: this.canvas,
                    ...this.size.hex,
                    x, y
                })
            }
        }
    }

    showHexes(upperContext) {
        if (this.changed) {
            console.time('>')
            this.context.clearRect(0, 0, this.size[0], this.size[1]);
            this.context.fillStyle = "#000"
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
            this.hexes.forEach(hex => hex.render())
            this.changed = false
            console.timeEnd('>')
        }

        upperContext.drawImage(this.canvas, 0, 0, this.size.canvas.width, this.size.canvas.height);
    }
}