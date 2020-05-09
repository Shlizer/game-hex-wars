import { BrowserWindow } from 'electron';

export default class ErrorHandler {
  static window: BrowserWindow | undefined;

  static setWindow(wnd: BrowserWindow) {
    ErrorHandler.window = wnd;
  }

  static send(error: Error) {
    if (ErrorHandler.window) {
      console.log('Sending an error msg', error.message);
      ErrorHandler.window.webContents.send('error', error.message);
    } else {
      console.log('No window handle to send an error msg');
    }
  }
}
