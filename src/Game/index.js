import { Engine } from './engine.js'

export function start() {
    const config = {
        showDebug: true,
        canvas: document.getElementById('mapCanvas'),
        container: document.getElementById('map')
    }

    const game = new Engine(config)
    game.run()
}