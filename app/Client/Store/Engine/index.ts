/* eslint-disable react/static-property-placement */
import Store from '..';
import LoopControl from './loopControl';

export default class Engine {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  store: Store;

  constructor(canvas: HTMLCanvasElement, store: Store) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.store = store;
    window.requestAnimationFrame(this.run);
  }

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
      this.store.current.map.render(this.context);
    }
  }
}
