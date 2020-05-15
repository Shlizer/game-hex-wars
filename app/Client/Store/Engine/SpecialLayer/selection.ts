import { autorun } from 'mobx';
import WithContext from '../../_withContext';
import LoopControler from '../../_loopControl';
import { clearContext, pixelToHex, hexDrawPoints } from '../helpers';
import State from '../state';
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

    document.addEventListener('mousedown', this.mouseClick);
  }

  mouseClick = (e: MouseEvent) => {
    setTimeout(() => {
      if (e.button === 0 && !State.isScrolling) {
        if (State.hex.x >= 0 && State.hex.y >= 0) {
          State.selected.x = State.hex.x;
          State.selected.y = State.hex.y;
        } else {
          State.selected.x = -1;
          State.selected.x = -1;
        }
      }
    }, 50);
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

    if (State.selected.x >= 0 && State.selected.y >= 0) {
      this.drawSelection({ ...State.selected, w: h.width, h: h.height });
    }

    if (State.mouse.x > 0 && State.mouse.y > 0) {
      const m = this.getMapSize();
      if (
        State.hex.x >= 0 &&
        State.hex.y >= 0 &&
        State.hex.x < m.width &&
        State.hex.y < m.height
      ) {
        this.drawCursor({ ...State.hex, w: h.width, h: h.height });
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
      ...{
        x: State.mouse.x + State.scroll.x,
        y: State.mouse.y + State.scroll.y
      },
      ...{ w: h.width, h: h.height }
    });
    if (State.hex.x !== x || State.hex.y !== y) {
      State.hex.x = x >= 0 && x < m.width ? x : -1;
      State.hex.y = y >= 0 && y < m.height ? y : -1;
    }
  }

  render(_mainContext?: CanvasRenderingContext2D): CanvasRenderingContext2D {
    clearContext(this.context);
    this.draw();
    return this.context;
  }
}
