/* eslint-disable react/static-property-placement */
import State from '../State';
import Map from './Parts/map';
import Grid from './Parts/grid';
import Input from './Parts/input';
import Selection from './Parts/selection';
import { clearContext } from './helpers';
import EnginePart from './Parts/_part';

export default class Engine {
  main: { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D };
  parts: EnginePart[] = [];

  constructor(mainCanvas: HTMLCanvasElement) {
    const context = mainCanvas.getContext('2d');
    if (context) this.main = { canvas: mainCanvas, context };
    else throw new Error('Cannot create context for layer.');

    this.parts.push(new Input());
    this.parts.push(new Map());
    this.parts.push(new Grid());
    this.parts.push(new Selection());

    window.requestAnimationFrame(this.run);
  }

  run = (time: number) => {
    if (State.map.selected) {
      this.update(time);
      this.render();
    }
    window.requestAnimationFrame(this.run);
  };

  update(time: number) {
    this.parts.forEach(part => part.update(time));
  }

  render() {
    clearContext(this.main.context);
    this.parts.forEach(part => part.renderWrapper(this.main.context));
  }
}
