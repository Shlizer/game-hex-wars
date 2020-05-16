import EnginePart from './_part';
import { Rect } from '../../../../Definitions/helper';
import { hexDrawPoints } from '../helpers';
import State from '../../State';
import MapManager from '../../Map/manager';

export default class Grid extends EnginePart {
  current: {
    scale: number;
    grid: { show: boolean; border: number; coord: boolean; path: boolean };
  };

  constructor() {
    super();
    this.current = {
      scale: State.viewport.scale,
      grid: {
        show: State.grid.show,
        border: State.grid.border,
        coord: State.grid.coord,
        path: State.grid.path
      }
    };
  }

  draw(hexWidth: number, hexHeight: number, columns: number, rows: number) {
    for (let y = 0; y < columns; y++) {
      for (let x = 0; x < rows; x++) {
        const rect = { x, y, w: hexWidth, h: hexHeight };
        if (this.current.grid.show) {
          if (this.current.grid.border > 0) this.drawGrid(rect);
          if (this.current.grid.coord) this.drawCoords(rect);
          if (this.current.grid.path) this.drawPaths(rect);
        }
      }
    }
  }

  drawGrid(rect: Rect) {
    const points = hexDrawPoints(rect);
    this.context.beginPath();
    this.context.lineWidth = this.current.grid.border;
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
    const textX = x * w * 0.75 + w / 2;
    const textY = y * h + (x % 2 ? h / 2 : 0) + h / 2;

    this.context.fillStyle = 'rgba(255,255,255,0.5)';
    this.context.font = 'normal 1.2em Lato';
    this.context.textAlign = 'center';
    this.context.fillText(`${x}, ${y}`, textX, textY);
  }

  drawPaths(rect: Rect) {
    if (MapManager.current) {
      const { x, y, w, h } = rect;
      const textX = x * w * 0.75 + w / 2;
      const textY = y * h + (x % 2 ? h / 2 : 0) + h / 2 + 12;
      const path = MapManager.current.path?.[y]?.[x];
      const textPath = path === undefined ? '-' : path.toString();

      this.context.fillStyle = Grid.getColor(path);
      this.context.font = 'normal 1.2em Lato';
      this.context.textAlign = 'center';
      this.context.fillText(textPath, textX, textY);
    }
  }

  static getColor(value?: number): string {
    if (value === undefined) return 'rgba(255,255,255,0.5)';

    let r: number;
    let g: number;
    const b = 0;
    const perc = value * 50;
    if (perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
    } else {
      g = 255;
      r = Math.round(510 - 5.1 * perc);
    }
    const h = r * 0x10000 + g * 0x100 + b * 0x1;
    return `#${`000000${h.toString(16)}`.slice(-6)}`;
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  update(_time: number) {
    const w = State.map.size.px.w + State.grid.border;
    const h = State.map.size.px.h + State.grid.border;
    this.checkCurrent(this.canvas, 'width', Math.round(w));
    this.checkCurrent(this.canvas, 'height', Math.round(h));

    this.checkCurrent(this.current, 'scale', State.viewport.scale);
    this.checkCurrent(this.current.grid, 'show', State.grid.show);
    this.checkCurrent(this.current.grid, 'border', State.grid.border);
    this.checkCurrent(this.current.grid, 'coord', State.grid.coord);
    this.checkCurrent(this.current.grid, 'path', State.grid.path);
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  renderPrepare(): void {
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
      State.map.offset.left - State.scroll.x - this.current.grid.border / 2,
      State.map.offset.top - State.scroll.y - this.current.grid.border / 2,
      this.canvas.width,
      this.canvas.height
    );
  }
}
