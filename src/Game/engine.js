import { Debugger } from './Debug/index.js'
import { Input } from './Input/index.js'
import { Canvas } from './Canvas/index.js'
import { Map } from './Map/index.js'

export class Engine {
    static initialize(config) {
        Engine.time = {
            start: performance.now(),
            now: performance.now(),
            stamps: [],
            fps: 0
        }
        Engine.loaded = false

        const { debug, canvas, container } = config
        Engine.debug = new Debugger(debug || false)
        Engine.input = new Input()
        Engine.map = new Map({ canvas, container })
        Engine.map.load({ ...config })
        window.Engine = Engine //@todo: for testing only
    }

    static update(time) {
        Engine.debug.update(time)
        Engine.input.update(time)
        Engine.map.update(time)
    }

    static render(time) {
        Engine.debug.render(time)
        Engine.input.render(time)
        Engine.map.render(time)
        if (!Engine.loaded) Engine.hideLoadScreen()
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

    static hideLoadScreen() {
        document.getElementById('loading').classList.add('done')
        Engine.loaded = true
    }
}
