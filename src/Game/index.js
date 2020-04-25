import { Engine } from './engine.js'

export function initialize(config) {
    Engine.initialize(config)
}

export function run() {
    window.requestAnimationFrame(Engine.run)
}
