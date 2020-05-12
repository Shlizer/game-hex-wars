import Store from '../../Store';

export default class Engine {
  canvas: HTMLCanvasElement;
  store: Store;

  constructor(canvas: HTMLCanvasElement, store: Store) {
    this.canvas = canvas;
    this.store = store;
    window.requestAnimationFrame(this.run);
  }

  run = (time: number) => {
    if (this.store.current) {
      this.update(time);
      this.render(time);
      if (this.store.current.map) window.requestAnimationFrame(this.run);
    }
  };

  update(time: number) {
    if (this.store.current.map) {
      this.store.current.map.update();
    }
  }

  render(time: number) {
    if (this.store.current.map) {
      this.store.current.map.render();
    }
  }
}
