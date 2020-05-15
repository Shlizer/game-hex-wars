import { autorun } from 'mobx';
import WithContext from '../../_withContext';
import LoopControler from '../../_loopControl';
import { clearContext, pixelToHex, hexDrawPoints } from '../helpers';
import { mouse, hex, selected } from '../state';
import { Rect, SizeStrict } from '../../../../Definitions/helper';
import Store from '../..';

export default class Selection extends WithContext implements LoopControler {
  store: Store;

  constructor(store: Store) {
    super();
    this.store = store;

    autorun(() => {
      const { map } = this.store.current;
      if (map) {
        this.canvas.width = map.size.width;
        this.canvas.height = map.size.height;
      }
    });

    document.addEventListener('mousemove', this.getMouse);
    document.addEventListener('mousedown', this.mouseClick);
  }

  getMouse = (e: MouseEvent) => {
    const header = document.getElementById('titleBar')?.clientHeight || 0;
    const { map } = this.store.current;
    mouse.x = e.x - (map?.layout?.offset?.left || 0);
    mouse.y = e.y - (map?.layout?.offset?.top || 0) - header;
  };

  mouseClick = (e: MouseEvent) => {
    if (e.button === 0) {
      if (hex.x >= 0 && hex.y >= 0) {
        selected.x = hex.x;
        selected.y = hex.y;
      } else {
        selected.x = -1;
        selected.x = -1;
      }
    }
  };

  // @computed?
  getMapSize(): SizeStrict {
    return {
      ...{ width: 0, height: 0 },
      ...this.store.current.map?.layout?.size
    };
  }

  // @computed?
  getHexSize(): SizeStrict {
    return {
      ...{ width: 0, height: 0 },
      ...this.store.current.map?.layout?.hex
    };
  }

  draw() {
    const h = this.getHexSize();

    if (selected.x >= 0 && selected.y >= 0) {
      this.drawSelection({ ...selected, w: h.width, h: h.height });
    }

    if (mouse.x > 0 && mouse.y > 0) {
      const m = this.getMapSize();
      if (hex.x >= 0 && hex.y >= 0 && hex.x < m.width && hex.y < m.height) {
        this.drawCursor({ ...hex, w: h.width, h: h.height });
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

  update(_time: number) {
    const h = this.getHexSize();
    const m = this.getMapSize();
    const { x, y } = pixelToHex({
      ...mouse,
      ...{ w: h.width, h: h.height }
    });
    if (hex.x !== x || hex.y !== y) {
      hex.x = x >= 0 && x < m.width ? x : -1;
      hex.y = y >= 0 && y < m.height ? y : -1;
    }
  }

  render(_mainContext?: CanvasRenderingContext2D): CanvasRenderingContext2D {
    clearContext(this.context);
    this.draw();
    return this.context;
  }
}
