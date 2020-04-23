import { CanvasManager } from './canvas.js'
import { Debugger } from './debugger.js'

export class Engine {
    showDebug
    canvas
    context
    container

    constructor(config) {
        const { showDebug, canvas, container } = config
        this.showDebug = showDebug
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.container = container
        this.debugger = new Debugger(this)
        this.canvasManager = new CanvasManager(this)
    }

    run() {
        requestAnimationFrame(this.loop)
    }

    loop = (time) => {
        this.canvasManager.render(time)

        if (this.showDebug) this.debugger.render(time)
        //if (game_running) 
        requestAnimationFrame(this.loop)
    }
}
