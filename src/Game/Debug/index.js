import { Engine } from '../engine.js'

export class Debugger {
    times = []
    fps = 0
    size = [160, 90]

    constructor(show) {
        if (show) {
            this.div = document.createElement('div')
            this.div.setAttribute('id', 'debug')
            document.getElementsByTagName('body')[0].appendChild(this.div)
        }
    }

    update(time) { }

    render(time) {
        this.div.innerHTML = [
            `FPS: ${Engine.time.fps.toFixed(2)}`,
            `Mouse: [${Engine.input.mouse.x}, ${Engine.input.mouse.y}]`
        ].join("<br/>")
    }
}