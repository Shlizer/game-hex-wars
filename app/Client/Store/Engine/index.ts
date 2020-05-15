/* eslint-disable react/static-property-placement */
import { SizeStrict, Rect } from '../../../Definitions/helper';
import Store from '..';
import State from './state';
import Grid from './SpecialLayer/grid';
import Selection from './SpecialLayer/selection';
import MapObject from '../Map/map';
import { clearContext } from './helpers';
import Input from './input';

const gridBorder = 2;

type CanvasObj = { [key: string]: HTMLCanvasElement };
type ContextObj = { [key: string]: CanvasRenderingContext2D };
export default class Engine {
  canvasNames = ['main', 'map', 'selection', 'objects'];
  canvas: CanvasObj = {};
  context: ContextObj = {};
  canvasSize: SizeStrict = { width: 0, height: 0 };

  store: Store;
  input: Input;
  grid: Grid;
  selection: Selection;

  constructor(store: Store, canvases: CanvasObj = {}) {
    this.createCanvases(canvases);
    this.store = store;
    this.input = new Input(store, this.canvas.main);
    this.grid = new Grid(store, gridBorder);
    this.selection = new Selection(store);
    window.requestAnimationFrame(this.run);
  }

  createCanvases(canvases: { [key: string]: HTMLCanvasElement } = {}) {
    this.canvasNames.forEach(canvasName => {
      if (canvases[canvasName]) this.canvas[canvasName] = canvases[canvasName];
      else this.canvas[canvasName] = document.createElement('canvas');
      const context = this.canvas[canvasName].getContext('2d');
      if (context) this.context[canvasName] = context;
      else throw new Error('Cannot create context for layer.');
    });
  }

  setCanvasSize(size: SizeStrict) {
    this.canvasSize = size;
    this.canvasNames.forEach(name => {
      this.canvas[name].width = size.width;
      this.canvas[name].height = size.height;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getMapRect(map: MapObject, withGrid = false): Rect {
    if (map) {
      const grid = withGrid ? gridBorder / 2 : 0;
      return {
        x: (map.layout?.offset?.left || 0) - grid,
        y: (map.layout?.offset?.top || 0) - grid,
        w: (map.size?.width || 0) + grid * 2,
        h: (map.size?.height || 0) + grid * 2
      };
    }
    return { x: 0, y: 0, w: 0, h: 0 };
  }

  run = (time: number) => {
    if (this.store.current.map?.loaded) {
      this.update(time);
      this.render();
    }
    window.requestAnimationFrame(this.run);
  };

  update(time: number) {
    if (!State.loop.firstDraw) State.loop.shouldRedraw = false;
    else State.loop.firstDraw = false;

    if (this.store.current.map) {
      if (this.canvasSize !== this.store.current.map.sizeOffset) {
        this.setCanvasSize(this.store.current.map.sizeOffset);
      }
      this.store.current.map.update(time);
      this.grid.update(time);
      this.selection.update(time);
    }
  }

  render() {
    if (this.store.current.map) {
      clearContext(this.context.main);
      this.renderMap(this.store.current.map);
      this.renderSelection(this.store.current.map);
      this.renderObjects(this.store.current.map);
    }
  }

  renderOnMain(canvas: HTMLCanvasElement) {
    this.context.main.drawImage(canvas, -State.scroll.x, -State.scroll.y);
  }

  renderMap(map: MapObject) {
    if (State.loop.shouldRedraw) {
      clearContext(this.context.map);
      const { x, y, w, h } = this.getMapRect(map, true);
      const mapCanvas = map.render(this.context.map).canvas;
      const gridCanvas = this.grid.render(this.context.map).canvas;
      this.context.map.drawImage(mapCanvas, 0, 0);
      this.context.map.drawImage(gridCanvas, x, y, w, h);
    }

    this.renderOnMain(this.canvas.map);
  }

  renderSelection(map: MapObject) {
    clearContext(this.context.selection);
    const { x, y, w, h } = this.getMapRect(map);
    const selCanvas = this.selection.render(this.context.selection).canvas;
    this.context.selection.drawImage(selCanvas, x, y, w, h);

    this.renderOnMain(this.canvas.selection);
  }

  renderObjects(map: MapObject) {
    clearContext(this.context.objects);
    //

    this.renderOnMain(this.canvas.objects);
  }
}
