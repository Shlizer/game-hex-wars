import { initialize, run } from './Game/index.js'
import cfg from './config.js'
const { remote } = require("electron")
window.assetsDir = remote.getGlobal("assetsDir")

const config = {
    canvas: document.getElementById('mapCanvas'),
    container: document.getElementById('map')
}

initialize({ ...config, ...cfg, map: 'test' })
run()