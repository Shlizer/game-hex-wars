import React from 'react';
import { decorate, observable } from 'mobx';
import Map from './Map/map';
import Manager from './Map/manager';

export default class Store {
  map: Manager;
  current: { map?: Map; player?: string } = {
    map: undefined,
    player: undefined
  };

  constructor() {
    this.map = new Manager();
  }

  selectMap(id: string) {
    this.map.deselectAll();
    this.current.map = this.map.select(id);
    if (this.current.map)
      this.current.map
        .load()
        .then(loaded => (!loaded ? this.deselectMap() : undefined))
        .catch(() => this.deselectMap());
  }

  deselectMap() {
    this.current.map = undefined;
  }
}

decorate(Store, {
  current: observable
});

export const StoreContext = React.createContext<Store | undefined>(undefined);
StoreContext.displayName = 'ClientStore';
