import { Layer } from "./Layer/index.js"

export class Map {
    layers = []

    changed = true
    size = {
        canvas: { width: 200, height: 200 }, // size of map canvas (in pixels)
        tiles: { width: 0, height: 0 }, // size of map in tiles
        hex: { width: 1, height: 1, border: 0 } // size of each tile
    }

    constructor({ canvas, container }) {
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.container = container
    }

    update() {
        this.layers.forEach(layer => layer.update())
    }

    render() {
        this.checkSize()
        this.clear()
        this.layers.forEach(layer => layer.render(this.context))
    }

    checkSize() {
        // If canvas resolution does not match container one
        if (this.canvas.width !== this.container.clientWidth || this.canvas.height !== this.container.clientHeight) {
            this.canvas.width = this.container.clientWidth
            this.canvas.height = this.container.clientHeight
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.fillStyle = "blue"
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    load({ layers = [], hex }) {
        layers.forEach(data => this.layers.push(new Layer(data, hex)))
        this.calculateSizes(hex)
    }

    calculateSizes(hex) {
        this.size.hex = { ...hex }
        this.size.tiles = this.layers.reduce((current, layer) => ({
            width: Math.max(current.width, layer.size.width),
            height: Math.max(current.height, layer.size.height)
        }), { width: 0, height: 0 })

        const mapSize = this.getMapSize()
        this.size.canvas.width = this.canvas.width = mapSize[0]
        this.size.canvas.height = this.canvas.height = mapSize[1]
    }

    getMapSize() {
        return [
            (this.size.hex.border) + (this.size.tiles.width * this.size.hex.width * 0.75) + (this.size.hex.width * 0.25),
            (this.size.hex.border * 2) + (this.size.tiles.height * this.size.hex.height) + (this.size.tiles.width > 1 ? this.size.hex.height / 2 : 0)
        ]
    }
}