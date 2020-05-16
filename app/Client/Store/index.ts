import React from 'react';
import State from './Engine/state';
import Manager from './Map/manager';

export default class Store {
  map: Manager;

  constructor() {
    this.map = new Manager();
  }

  selectMap(id: string) {
    this.map.deselectAll();
    this.map.select(id);
  }

  // eslint-disable-next-line class-methods-use-this
  deselectMap() {
    State.map.selected = undefined;
  }
}

export const StoreContext = React.createContext<Store | undefined>(undefined);
StoreContext.displayName = 'ClientStore';
