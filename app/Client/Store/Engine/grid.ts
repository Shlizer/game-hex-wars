import { autorun } from 'mobx';
import WithContext from '../_withContext';
import LoopControler from '../_loopControl';
import Store from '..';

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
        if (this.gridBorder > 0) this.drawGrid(x, y, hexWidth, hexHeight);
        if (this.showCoords) this.drawCoords(x, y, hexWidth, hexHeight);
      }
    }
  }

  drawGrid(x: number, y: number, width: number, height: number) {
    const dx = x * width * 0.75;
    const dy = y * height + (x % 2 ? height / 2 : 0);

    const points = [
      [dx + width / 4, dy], // top - left
      [dx + (width * 3) / 4, dy], // top - right
      [dx + width, dy + height / 2], // right
      [dx + (width * 3) / 4, dy + height], // bottom - right
      [dx + width / 4, dy + height], // bottom - left
      [dx + 0, dy + height / 2] // left
    ];
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

  drawCoords(x: number, y: number, width: number, height: number) {
    this.context.fillStyle = 'white';
    this.context.font = 'normal 1.2em Lato';
    this.context.textAlign = 'center';
    this.context.fillText(
      `${x}, ${y}`,
      x * width * 0.75 + width / 2,
      y * height + (x % 2 ? height / 2 : 0) + height / 2
    );
  }

  // eslint-disable-next-line class-methods-use-this
  update(_time: number) {}

  render(_mainContext?: CanvasRenderingContext2D): CanvasRenderingContext2D {
    return this.context;
  }
}
