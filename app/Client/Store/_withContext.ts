/* eslint-disable react/static-property-placement */

export default class WithContext {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    const context = this.canvas.getContext('2d');

    if (context) this.context = context;
    else throw new Error('Cannot create context for layer.');
  }

  setAlpha(alpha?: number) {
    this.context.globalAlpha = alpha === undefined ? 1 : alpha;
  }
}
