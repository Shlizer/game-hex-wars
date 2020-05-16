/* eslint-disable no-underscore-dangle */
import { decorate, observable, computed, action } from 'mobx';
import { Point, Size, Offset } from '../../../Definitions/helper';

class State {
  _loop: { firstDraw: boolean; shouldRedraw: boolean }; // Loop controls
  _isScrolling: boolean; // Is currently scrolling
  _scroll: Point; // Scroll offset
  _mouse: Point; // Mouse position (in map)
  _grid: { show: boolean; border: number; coord: boolean; path: boolean };

  _hex: {
    size: Size;
    hover: Point;
    select: Point;
  };

  _map: {
    selected?: string;
    size: {
      px: Size;
      hex: Size;
      full: Size;
    };
    offset: Offset;
  };

  constructor() {
    const emptySize = { w: 0, h: 0 };
    const emptyPoint = { x: -1, y: -1 };
    const emptyOffset = { top: 0, left: 0, right: 0, bottom: 0 };

    this._loop = { firstDraw: true, shouldRedraw: true };
    this._isScrolling = false;
    this._scroll = { x: 0, y: 0 };
    this._mouse = { x: 0, y: 0 };
    this._grid = { show: true, border: 2, coord: true, path: true };

    this._hex = {
      size: { ...emptySize },
      hover: { ...emptyPoint },
      select: { ...emptyPoint }
    };
    this._map = {
      size: {
        px: { ...emptySize },
        hex: { ...emptySize },
        full: { ...emptySize }
      },
      offset: { ...emptyOffset }
    };
  }

  get loop() {
    return this._loop;
  }

  get isScrolling() {
    return this._isScrolling;
  }

  get scroll() {
    return this._scroll;
  }

  get mouse() {
    return this._mouse;
  }

  get grid() {
    return this._grid;
  }

  get hex() {
    return this._hex;
  }

  get map() {
    return this._map;
  }

  setScrolling(s: boolean) {
    this._isScrolling = s;
  }
}

decorate(State, {
  _loop: observable,
  _isScrolling: observable,
  _scroll: observable,
  _mouse: observable,
  _grid: observable,
  _hex: observable,
  _map: observable,
  //
  loop: computed,
  isScrolling: computed,
  scroll: computed,
  mouse: computed,
  grid: computed,
  hex: computed,
  map: computed,
  //
  setScrolling: action
});

const state = new State();
export default state;
