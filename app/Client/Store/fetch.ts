/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint no-throw-literal: off */

import { ipcRenderer, IpcRendererEvent } from 'electron';

const MINUTE = 1000;

type FetcherData = {
  key: string;
  data?: unknown;
  callback: (
    data: any,
    resolve: () => unknown,
    reject: () => unknown
  ) => unknown;
  before?: () => unknown;
  after?: () => unknown;
  final?: () => unknown;
  wait?: number;
};

export default class Fetcher {
  static create(fetchData: FetcherData): Promise<any> {
    const {
      key,
      data,
      callback,
      before,
      after,
      final,
      wait = MINUTE
    } = fetchData;

    let waitTimeout: number;
    const waitPromise = new Promise(resolve => {
      waitTimeout = window.setTimeout(() => {
        resolve(
          Fetcher.sendError(
            `Zbyt długi okres oczekiwania (${(wait / 1000).toFixed(0)}s)`
          )
        );
      }, wait);
    });

    const userPromise = new Promise((resolve, reject) => {
      if (before) before();
      ipcRenderer.on(
        `${key}-data`,
        (_event: IpcRendererEvent, received: unknown) => {
          clearTimeout(waitTimeout);
          callback(received, resolve, reject);
          if (after) after();
        }
      );
      console.log(`reaching ${key}-request`);
      ipcRenderer.send(`${key}-request`, data);
    });

    return Promise.race([waitPromise, userPromise]).finally(() =>
      final ? final() : null
    );
  }

  static sendError(msg: string) {
    const event = new CustomEvent('app-error', { detail: msg });
    document.dispatchEvent(event);
  }
}
