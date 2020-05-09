import path from 'path';
import fs from 'fs-extra';
import { app, BrowserWindow, globalShortcut } from 'electron';
// import AppUpdater from '../main.dev';
import ErrorHandler from '../Error';
import FetchMap from '../Fetcher/map';
import FetchTileset from '../Fetcher/tileset';
import Options from '../options';

const cfgPath = path.join(__dirname, '../../../config.json');
const defaultCfg = {
  debug: true,
  dir: {
    asset: '%MAIN_PATH%/assets',
    map: '%ASSET_DIR%/maps',
    tileset: '%ASSET_DIR%/tileset'
  }
};

export default class Window {
  static wndHandle: BrowserWindow | null = null;

  static init() {
    process.on('uncaughtException', (error: unknown) => {
      console.log('UNHANDLED EXCEPTION >>> ', error);
      ErrorHandler.send(
        error instanceof Error ? error : new Error('Unknown error')
      );
    });
    app.on('window-all-closed', () =>
      process.platform !== 'darwin' ? app.quit() : undefined
    );
    app.on('ready', Window.createWindow);
    app.on('activate', Window.recreate);
    Window.getCfg();
    FetchMap.init();
    FetchTileset.init();
  }

  static getCfg() {
    const config = { ...defaultCfg };
    if (fs.existsSync(cfgPath)) {
      Object.assign(config, fs.readJSONSync(cfgPath));
      console.log('Load custom config', config);
    }
    Options.setCfg(config);
  }

  static installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS'];

    return Promise.all(
      extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(console.log);
  };

  static createWindow = async () => {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      await Window.installExtensions();
    }

    Window.wndHandle = new BrowserWindow({
      title: 'Hex Wars',
      transparent: true,
      width: 1200,
      height: 700,
      // alwaysOnTop: true,
      frame: false,
      resizable: false,
      fullscreenable: false,
      webPreferences:
        process.env.NODE_ENV === 'development' ||
        process.env.E2E_BUILD === 'true'
          ? { nodeIntegration: true }
          : { preload: path.join(__dirname, 'dist/renderer.prod.js') }
    });

    ErrorHandler.setWindow(Window.wndHandle);

    Window.wndHandle.loadURL(`file://${__dirname}/app.html`);

    /** Handle reload shortcuts */
    Window.wndHandle.on('focus', () => {
      globalShortcut.registerAll(['CommandOrControl+R', 'F5'], () => {});
    });
    Window.wndHandle.on('blur', () => {
      globalShortcut.unregisterAll();
    });

    // @TODO: Use 'ready-to-show' event
    //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
    Window.wndHandle.webContents.on('did-finish-load', () => {
      if (!Window.wndHandle) {
        throw new Error('"wndHandle" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        Window.wndHandle.minimize();
      } else {
        Window.wndHandle.show();
        Window.wndHandle.focus();
      }
    });

    Window.wndHandle.on('closed', () => {
      Window.wndHandle = null;
    });

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
        // new AppUpdater();
  };

  static recreate() {
    if (Window.wndHandle === null) Window.createWindow();
  }
}
