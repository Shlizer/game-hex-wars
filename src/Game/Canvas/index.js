import { Engine } from '../engine.js'

export class Canvas {
    constructor(canvas, container) {
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.container = container
        this.drawable = []
    }

    update(time) { }

    render(time) {
        this.checkSize()
        this.clear(time)
    }

    checkSize() {
        // look up the size the canvas is being displayed
        const width = this.container.clientWidth
        const height = this.container.clientHeight

        // If it's resolution does not match change it
        if (this.canvas.width !== width || this.canvas.height !== height) {
            this.canvas.width = width
            this.canvas.height = height
            Engine.input.offset.x = this.canvas.getBoundingClientRect().x
            Engine.input.offset.y = this.canvas.getBoundingClientRect().y
            return true
        }

        return false
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawable.forEach(obj => obj.render(this.context))
    }

    addForRender(renderable) {
        this.drawable.push(renderable)
    }

    // @todo: for performance check
    squares(time) {
        time *= 0.001
        this.context.fillStyle = "#DDE"
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.save()

        const spacing = 64
        const size = 48
        const across = this.canvas.width / spacing + 1
        const down = this.canvas.height / spacing + 1
        const s = Math.sin(time)
        const c = Math.cos(time)
        this.context.strokeStyle = "black"
        this.context.lineWidth = 1
        const drawIt = () => {
            for (let y = 0; y < down; ++y) {
                for (let x = 0; x < across; ++x) {
                    this.context.setTransform(c, -s, s, c, x * spacing, y * spacing)
                    this.context.strokeRect(-size / 2, -size / 2, size, size)
                }
            }
        }
        // performance test
        for (let i = 0; i < 50; ++i) {
            drawIt()
        }

        this.context.restore()
    }
}