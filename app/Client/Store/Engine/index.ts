/* eslint-disable react/static-property-placement */
import Store from '..';
import LoopControl from './loopControl';
import WithContext from '../_withContext';
import Grid from './grid';

const gridBorder = 2;

export default class Engine extends WithContext {
  mainCanvas: HTMLCanvasElement;
  mainContext: CanvasRenderingContext2D;
  mapCanvas?: HTMLCanvasElement;
  store: Store;
  grid: Grid;
  mouse = { x: 0, y: 0 };

  constructor(canvas: HTMLCanvasElement, store: Store) {
    super();
    this.mainCanvas = canvas;

    const context = canvas.getContext('2d');
    if (context) this.mainContext = context;
    else throw new Error('Cannot create context for layer.');

    this.store = store;
    this.grid = new Grid(store, gridBorder);
    document.addEventListener('mousemove', this.getMouse);
    window.requestAnimationFrame(this.run);
  }

  getMouse = (e: MouseEvent) => {
    const header = document.getElementById('titleBar')?.clientHeight || 0;
    const { map } = this.store.current;
    this.mouse.x = e.x - (map?.layout?.offset?.left || 0);
    this.mouse.y = e.y - (map?.layout?.offset?.top || 0) - header;
  };

  run = (time: number) => {
    if (this.store.current.map?.loaded) {
      this.update(time);
      this.render();
    }
    window.requestAnimationFrame(this.run);
  };

  update(time: number) {
    if (!LoopControl.firstDraw) LoopControl.shouldRedraw = false;
    else LoopControl.firstDraw = false;

    if (this.store.current.map) {
      this.store.current.map.update(time);
    }
  }

  render() {
    if (this.store.current.map && this.context) {
      const { map } = this.store.current;

      if (LoopControl.shouldRedraw) {
        this.mainContext.drawImage(map.render(this.context).canvas, 0, 0);
        this.mainContext.drawImage(
          this.grid.render(this.context).canvas,
          (map.layout?.offset?.left || 0) - gridBorder / 2,
          (map.layout?.offset?.top || 0) - gridBorder / 2,
          (map.size?.width || 0) + gridBorder,
          (map.size?.height || 0) + gridBorder
        );
      }
    }
  }
}
