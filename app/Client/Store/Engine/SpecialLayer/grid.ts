import { autorun } from 'mobx';
import WithContext from '../../_withContext';
import LoopControler from '../../_loopControl';
import { Rect } from '../../../../Definitions/helper';
import { hexDrawPoints } from '../helpers';
import Store from '../..';

export default class Grid extends WithContext implements LoopControler {
  store: Store;
  gridBorder: number;
  showCoords: boolean;

  constructor(store: Store, gridBorder = 1, showCoords = true) {
    super();
    this.store = store;
    this.gridBorder = gridBorder;
    this.showCoords = showCoords;

    autorun(() => {
      const { map } = this.store.current;
      if (map) {
        this.canvas.width = map.size.width;
        this.canvas.height = map.size.height;
        this.draw(
          map.layout?.hex.width || 0,
          map.layout?.hex.height || 0,
          map.layout?.size.height || 0,
          map.layout?.size.width || 0
        );
      }
    });
  }

  draw(hexWidth: number, hexHeight: number, columns: number, rows: number) {
    for (let y = 0; y < columns; y++) {
      for (let x = 0; x < rows; x++) {
        const rect = { x, y, w: hexWidth, h: hexHeight };
        if (this.gridBorder > 0) this.drawGrid(rect);
        if (this.showCoords) this.drawCoords(rect);
      }
    }
  }

  drawGrid(rect: Rect) {
    const points = hexDrawPoints(rect);
    this.context.beginPath();
    this.context.lineWidth = this.gridBorder;
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
  update(_time: number) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(_mainContext?: CanvasRenderingContext2D): CanvasRenderingContext2D {
    return this.context;
  }
}
