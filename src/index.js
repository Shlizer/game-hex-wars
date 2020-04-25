import { initialize, run } from './Game/index.js'

const config = {
    showDebug: true,
    canvas: document.getElementById('mapCanvas'),
    container: document.getElementById('map')
}

initialize(config)
run()