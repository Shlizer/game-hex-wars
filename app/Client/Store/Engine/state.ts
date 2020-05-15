/* eslint-disable no-underscore-dangle */
import { decorate, observable, computed, action } from 'mobx';
import { Point } from '../../../Definitions/helper';

class State {
  _loop: { firstDraw: boolean; shouldRedraw: boolean }; // Loop controls
  _isScrolling: boolean; // Scroll data
  _scroll: Point; // Mouse position (in map)
  _mouse: Point; // Hex hovered
  _hex: Point; // Hex selection
  _selected: Point;

  constructor() {
    this._loop = { firstDraw: true, shouldRedraw: true };
    this._isScrolling = false;
    this._scroll = { x: 0, y: 0 };
    this._mouse = { x: 0, y: 0 };
    this._hex = { x: 0, y: 0 };
    this._selected = { x: -1, y: -1 };
  }

  get mouse() {
    return this._mouse;
  }

  get scroll() {
    return this._scroll;
  }

  get hex() {
    return this._hex;
  }

  get loop() {
    return this._loop;
  }

  get selected() {
    return this._selected;
  }

  get isScrolling() {
    return this._isScrolling;
  }

  setScrolling(s: boolean) {
    this._isScrolling = s;
  }
}

decorate(State, {
  _loop: observable,
  _scroll: observable,
  _mouse: observable,
  _hex: observable,
  _selected: observable,
  //
  mouse: computed,
  scroll: computed,
  hex: computed,
  loop: computed,
  selected: computed,
  isScrolling: computed,
  //
  setScrolling: action
});

const state = new State();
export default state;
