/* eslint-disable react/static-property-placement */
import { pixelToHex } from '../helpers';
import State from '../../State';
import EnginePart from './_part';

export default class Input extends EnginePart {
  drag = { x: 0, y: 0 };
  mainCanvas?: HTMLCanvasElement;

  getHexHover = () => {
    const map = State.map.size.hex;
    const { left, top } = State.map.offset;
    const { x, y } = pixelToHex({
      ...{
        x: State.mouse.position.x - (left || 0) + State.scroll.x,
        y: State.mouse.position.y - (top || 0) + State.scroll.y
      },
      ...State.hex.size
    });
    if (State.hex.hover.x !== x || State.hex.hover.y !== y) {
      State.hexHover = {
        x: x >= 0 && x < map.w ? x : -1,
        y: y >= 0 && y < map.h ? y : -1
      };
    }
  };

  changeScale = (e: WheelEvent) => {
    const { scale } = State.viewport;
    State.viewportScale = e.deltaY < 0 ? scale + 0.1 : scale - 0.1;
  };

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  update(): void {}

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  renderPrepare(): void {}

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  renderOnMain(_mainContext: CanvasRenderingContext2D): void {
    if (!this.mainCanvas) {
      this.mainCanvas = _mainContext.canvas;
      this.mainCanvas.addEventListener('mousemove', this.getHexHover);
      this.mainCanvas.addEventListener('wheel', this.changeScale);
    }
  }
}
