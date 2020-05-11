/* eslint promise/catch-or-return: off */

import { observable } from 'mobx';

export type loadData = {
  key: string;
  text?: string;
  promise?: Promise<unknown>;
};

export default class Loader {
  static list: loadData[] = observable([]);

  static add(key: string, text?: string, promise?: Promise<unknown>) {
    Loader.list.push({ key, text, promise });
    if (promise)
      promise.then(value => {
        Loader.remove(key);
        return value;
      });
  }

  static prepend(key: string, text?: string, promise?: Promise<unknown>) {
    Loader.list.unshift({ key, text, promise });
    if (promise)
      promise.then(value => {
        Loader.remove(key);
        return value;
      });
  }

  static remove(key: string) {
    const index = Loader.list.findIndex(data => data.key === key);
    Loader.list.splice(index, 1);
  }
}
