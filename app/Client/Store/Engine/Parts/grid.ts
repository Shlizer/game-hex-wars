import EnginePart from './_part';
import { Rect } from '../../../../Definitions/helper';
import { hexDrawPoints, clearContext } from '../helpers';
import State from '../state';

export default class Grid extends EnginePart {
  draw(hexWidth: number, hexHeight: number, columns: number, rows: number) {
    for (let y = 0; y < columns; y++) {
      for (let x = 0; x < rows; x++) {
        const rect = { x, y, w: hexWidth, h: hexHeight };
        if (State.grid.border > 0) this.drawGrid(rect);
        if (State.grid.coords) this.drawCoords(rect);
      }
    }
  }

  drawGrid(rect: Rect) {
    const points = hexDrawPoints(rect);
    this.context.beginPath();
    this.context.lineWidth = State.grid.border;
    this.context.moveTo(points[0][0], points[0][1]);

    for (let i = 1; i < points.length; ++i) {
      this.context.lineTo(points[i][0], points[i][1]);
    }
    this.context.lineTo(points[0][0], points[0][1]);
    this.context.strokeStyle = 'white';
    this.context.fillStyle = '#333333';
    this.context.stroke();
  }

  drawCoords(rect: Rect) {
    const { x, y, w, h } = rect;
    this.context.fillStyle = 'white';
    this.context.font = 'normal 1.2em Lato';
    this.context.textAlign = 'center';
    this.context.fillText(
      `${x}, ${y}`,
      x * w * 0.75 + w / 2,
      y * h + (x % 2 ? h / 2 : 0) + h / 2
    );
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  update(_time: number) {
    const w = State.map.size.px.w + State.grid.border;
    const h = State.map.size.px.h + State.grid.border;

    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
      this.shouldUpdate = true;
    }
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  renderPrepare(): void {
    clearContext(this.context);
    this.draw(
      State.hex.size.w || 0,
      State.hex.size.h || 0,
      State.map.size.hex.h || 0,
      State.map.size.hex.w || 0
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderOnMain(_mainContext: CanvasRenderingContext2D): void {
    _mainContext.drawImage(
      this.canvas,
      State.map.offset.left - State.scroll.x - State.grid.border / 2,
      State.map.offset.top - State.scroll.y - State.grid.border / 2,
      this.canvas.width,
      this.canvas.height
    );
  }
}
