/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { decorate, observable, computed } from 'mobx';
import { Size, Offset } from '../../../Definitions/helper';

class State {
  // Game loop controls
  _loop = { firstDraw: true, shouldRedraw: true };

  // Scrolls
  _scroll = { position: { x: 0, y: 0 }, isScroll: false };

  // Mouse data
  _mouse = { position: { x: 0, y: 0 }, show: true, visible: false, mode: '' };

  // Canvas viewport
  _viewport = { size: { w: 0, h: 0 }, scale: 1 };

  // Map data
  _map: {
    selected?: string;
    size: { px: Size; hex: Size; full: Size };
    offset: Offset;
  } = {
    selected: undefined,
    size: { px: { w: 0, h: 0 }, hex: { w: 0, h: 0 }, full: { w: 0, h: 0 } },
    offset: { top: 0, left: 0, right: 0, bottom: 0 }
  };

  // Grid extras
  _grid = { show: true, border: 2, coord: true, path: true };

  // Hex data
  _hex = {
    size: { w: 0, h: 0 },
    hover: { x: -1, y: -1 },
    select: { x: -1, y: -1 }
  };

  /**
   * LOOP
   */
  get loop() {
    return this._loop;
  }

  /**
   * SCROLL
   */
  get scroll() {
    return this._scroll.position;
  }

  set scroll(value) {
    this._scroll.position.x = value.x;
    this._scroll.position.y = value.y;
  }

  get isScrolling() {
    return this._scroll.isScroll;
  }

  set isScrolling(value) {
    this._scroll.isScroll = value;
  }

  /**
   * MOUSE
   */
  get mouse() {
    return this._mouse;
  }

  /**
   * VIEWPORT
   */
  get viewport() {
    return this._viewport;
  }

  set viewportScale(value: number) {
    this._viewport.scale =
      Math.round(Math.min(2, Math.max(0.6, value)) * 10) / 10;
  }

  /**
   * MAP
   */
  get map() {
    const { scale } = this.viewport;
    const { selected, size, offset } = this._map;
    const { px, hex, full } = size;
    return {
      selected,
      size: {
        px: { w: scale * px.w, h: scale * px.h },
        hex: { w: hex.w, h: hex.h },
        full: { w: scale * full.w, h: scale * full.h }
      },
      offset: {
        top: scale * offset.top,
        left: scale * offset.left,
        right: scale * offset.right,
        bottom: scale * offset.bottom
      }
    };
  }

  set map(value) {
    const { size, offset } = value;
    this._map.size.px = size.px;
    this._map.size.hex = size.hex;
    this._map.size.full = size.full;
    this._map.offset = offset;
  }

  set mapSelected(value: string | undefined) {
    this._map.selected = value;
  }

  set mapSizePx(value: Size) {
    this._map.size.px = value;
  }

  set mapSizeHex(value: Size) {
    this._map.size.hex = value;
  }

  set mapSizeFull(value: Size) {
    this._map.size.full = value;
  }

  set mapOffset(value: Offset) {
    this._map.offset = value;
  }

  /**
   * GRID
   */
  get grid() {
    return this._grid;
  }

  /**
   * HEX
   */
  get hex() {
    const { scale } = this.viewport;
    const { hover, select, size } = this._hex;
    return {
      hover,
      select,
      size: { w: scale * size.w, h: scale * size.h }
    };
  }

  set hexSize(value: { w: number; h: number }) {
    this._hex.size = value;
  }

  set hexHover(value: { x: number; y: number }) {
    this._hex.hover = value;
  }

  set hexSelect(value: { x: number; y: number }) {
    this._hex.select = value;
  }
}

decorate(State, {
  _loop: observable,
  _scroll: observable,
  _mouse: observable,
  _viewport: observable,
  _grid: observable,
  _hex: observable,
  _map: observable,
  //
  loop: computed,
  isScrolling: computed,
  scroll: computed,
  mouse: computed,
  viewport: computed,
  grid: computed,
  hex: computed,
  map: computed
});

const state = new State();
export default state;
