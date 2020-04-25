import { Debugger } from './Debug/index.js'
import { Input } from './Input/index.js'
import { Canvas } from './Canvas/index.js'

export class Engine {
    static initialize(config) {
        Engine.time = {
            start: performance.now(),
            now: performance.now(),
            stamps: [],
            fps: 0
        }

        const { showDebug, canvas, container } = config
        Engine.debug = new Debugger(showDebug)
        Engine.input = new Input()
        Engine.canvas = new Canvas(canvas, container)
    }

    static update(time) {
        Engine.debug.update(time)
        Engine.input.update(time)
        Engine.canvas.update(time)
    }

    static render(time) {
        Engine.debug.render(time)
        Engine.input.render(time)
        Engine.canvas.render(time)
    }

    static run(time) {
        Engine.time.now = time
        while (Engine.time.stamps.length > 0 && Engine.time.stamps[0] <= Engine.time.now - 1000) {
            Engine.time.stamps.shift();
        }
        Engine.time.stamps.push(Engine.time.now)
        Engine.time.fps = Engine.time.stamps.length
        Engine.update(time)
        Engine.render(time)
        window.requestAnimationFrame(Engine.run)
    }
}
