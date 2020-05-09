/* eslint promise/catch-or-return: off */

import { observable } from 'mobx';

type loadData = {
  key: string;
  text?: string;
  promise?: Promise<any>;
};

export default class Loader {
  static loadData: loadData[] = observable([]);

  static add(key: string, text?: string, promise?: Promise<any>) {
    Loader.loadData.push({ key, text, promise });
    if (promise)
      promise.then(value => {
        Loader.remove(key);
        return value;
      });
  }

  static remove(key: string) {
    const index = Loader.loadData.findIndex(data => data.key === key);
    Loader.loadData.splice(index, 1);
  }
}
