import React from 'react';
import { decorate, observable } from 'mobx';
import Map from './Map/map';
import Manager from './Map/manager';

export default class Store {
  current: { map?: Map; player?: string } = {
    map: undefined,
    player: undefined
  };

  map: Manager;

  constructor() {
    this.map = new Manager();
  }

  selectMap(id: string) {
    this.map.deselectAll();
    this.current.map = this.map.select(id);
    if (this.current.map) console.log('current map -> ', id);
  }
}

decorate(Store, {
  current: observable
});

export const StoreContext = React.createContext<Store>(new Store());
StoreContext.displayName = 'ClientStore';
