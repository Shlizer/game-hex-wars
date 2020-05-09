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
    if (this.current.map) this.current.map.load();
  }
}

decorate(Store, {
  current: observable
});

export const StoreContext = React.createContext<Store | undefined>(undefined);
StoreContext.displayName = 'ClientStore';
