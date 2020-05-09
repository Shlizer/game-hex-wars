import path from 'path';
import fs from 'fs-extra';
import { app, BrowserWindow } from 'electron';
// import AppUpdater from '../main.dev';
import MapFetch from '../MapFetch';
import Store from '../../Store';

const cfgPath = path.join(__dirname, '../../../config.json')

export class Window {
    wndHandle: BrowserWindow | null = null;
    static mapSrv: MapFetch | null = null;

    constructor() {
        app.on('window-all-closed', () => (process.platform !== 'darwin') ? app.quit() : undefined);
        app.on('ready', this.createWindow);
        app.on('activate', this.recreate);
        this.getCfg()
        Window.mapSrv = new MapFetch()
    }

    getCfg() {
        const config = {
            debug: true,
            assetDir: "%MAIN_PATH%/assets",
            mapDir: "%ASSET_DIR%/maps",
            tilesetDir: "%ASSET_DIR%/tileset"
        }
        if (fs.existsSync(cfgPath)) {
            Object.assign(config, fs.readJSONSync(cfgPath))
            console.log('Load custom config', config)
        }
        Store.setCfg(config)
    }

    installExtensions = async () => {
        const installer = require('electron-devtools-installer');
        const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
        const extensions = ['REACT_DEVELOPER_TOOLS'];
      
        return Promise.all(
            extensions.map(name => installer.default(installer[name], forceDownload))
        ).catch(console.log);
    };

    createWindow = async () => {
        if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
            await this.installExtensions();
        }
      
        this.wndHandle = new BrowserWindow({
            title: 'Hex Wars',
            transparent: true,
            width: 1200,
            height: 700,
            // alwaysOnTop: true,
            frame: false,
            resizable: false,
            fullscreenable: false,
            webPreferences:
            process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true'
                ? { nodeIntegration: true }
                : { preload: path.join(__dirname, 'dist/renderer.prod.js') }
        });
      
        this.wndHandle.loadURL(`file://${__dirname}/app.html`);
      
        // @TODO: Use 'ready-to-show' event
        //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
        this.wndHandle.webContents.on('did-finish-load', () => {
            if (!this.wndHandle) {
                throw new Error('"mainWindow" is not defined');
            }
            if (process.env.START_MINIMIZED) {
                this.wndHandle.minimize();
            } else {
                this.wndHandle.show();
                this.wndHandle.focus();
            }
        });
      
        this.wndHandle.on('closed', () => {
            this.wndHandle = null;
        });
      
        // Remove this if your app does not use auto updates
        // eslint-disable-next-line
        // new AppUpdater();
    };

    recreate() {
        if (this.wndHandle === null) this.createWindow();
    }
}

