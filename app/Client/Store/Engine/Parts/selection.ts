import EnginePart from './_part';
import { clearContext, hexDrawPoints } from '../helpers';
import State from '../state';
import { Rect } from '../../../../Definitions/helper';

export default class Selection extends EnginePart {
  constructor() {
    super();
    document.addEventListener('mousedown', this.mouseClick);
  }

  mouseClick = (e: MouseEvent) => {
    setTimeout(() => {
      if (e.button === 0 && !State.isScrolling) {
        if (State.hex.hover.x >= 0 && State.hex.hover.y >= 0) {
          State.hex.select.x = State.hex.hover.x;
          State.hex.select.y = State.hex.hover.y;
        } else {
          State.hex.select.x = -1;
          State.hex.select.x = -1;
        }
      }
    }, 50);
  };

  draw() {
    if (State.hex.select.x >= 0 && State.hex.select.y >= 0) {
      const { w, h } = State.hex.size;
      this.drawSelection({ ...State.hex.select, w, h });
    }

    if (State.mouse.position.x > 0 && State.mouse.position.y > 0) {
      const { w, h } = State.hex.size;
      if (
        State.hex.hover.x >= 0 &&
        State.hex.hover.y >= 0 &&
        State.hex.hover.x < w &&
        State.hex.hover.y < h
      ) {
        this.drawCursor({ ...State.hex.hover, w, h });
      }
    }
  }

  drawSelection(rect: Rect) {
    const points = hexDrawPoints(rect);
    this.context.beginPath();
    this.context.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; ++i) {
      this.context.lineTo(points[i][0], points[i][1]);
    }
    this.context.lineTo(points[0][0], points[0][1]);
    this.context.fillStyle = 'rgba(55,87,87,0.5)';
    this.context.fill();
  }

  drawCursor(rect: Rect) {
    const points = hexDrawPoints(rect);
    this.context.beginPath();
    this.context.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; ++i) {
      this.context.lineTo(points[i][0], points[i][1]);
    }
    this.context.lineTo(points[0][0], points[0][1]);
    this.context.fillStyle = 'rgba(87,87,55,0.5)';
    this.context.fill();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  update(_time: number) {
    const { w, h } = State.map.size.px;
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    this.shouldUpdate = true;
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  renderPrepare(): void {
    clearContext(this.context);
    this.draw();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderOnMain(_mainContext: CanvasRenderingContext2D): void {
    _mainContext.drawImage(
      this.canvas,
      State.map.offset.left - State.scroll.x,
      State.map.offset.top - State.scroll.y,
      this.canvas.width,
      this.canvas.height
    );
  }
}
