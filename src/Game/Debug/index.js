import { Engine } from '../engine.js'

export class Debugger {
    visible = false

    constructor(show) {
        this.visible = show
    }

    update(time) { }

    render(time) {
        if (this.visible) {
            if (!this.div) this.makeDebugWindow()
            this.div.innerHTML = [
                `FPS: ${Engine.time.fps.toFixed(2)}`,
                `Mouse: [${Engine.input.mouse.x}, ${Engine.input.mouse.y}]`
            ].join("<br/>")
        }
    }

    makeDebugWindow() {
        this.div = document.createElement('div')
        this.div.setAttribute('id', 'debug')
        document.getElementsByTagName('body')[0].appendChild(this.div)
    }
}