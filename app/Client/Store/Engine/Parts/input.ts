/* eslint-disable react/static-property-placement */
import { Point } from '../../../../Definitions/helper';
import { pixelToHex } from '../helpers';
import State from '../state';
import EnginePart from './_part';

export default class Input extends EnginePart {
  drag: Point = { x: 0, y: 0 };
  initialized = false;

  constructor() {
    super();
    document.addEventListener('mousemove', this.getMouse);
    document.addEventListener('dragstart', this.dragStart);
    document.addEventListener('drag', this.dragMove);
    document.addEventListener('dragend', this.dragEnd);
  }

  getMouse = (e: MouseEvent) => {
    // Check mouse position
    const header = document.getElementById('titleBar')?.clientHeight || 0;
    const { left, top } = State.map.offset;
    State.mouse.x = e.x - (left || 0);
    State.mouse.y = e.y - (top || 0) - header;

    // Check hex hover
    const map = State.map.size.hex;
    const { x, y } = pixelToHex({
      ...{
        x: State.mouse.x + State.scroll.x,
        y: State.mouse.y + State.scroll.y
      },
      ...State.hex.size
    });
    if (State.hex.hover.x !== x || State.hex.hover.y !== y) {
      State.hex.hover.x = x >= 0 && x < map.w ? x : -1;
      State.hex.hover.y = y >= 0 && y < map.h ? y : -1;
    }
  };

  dragStart = (e: DragEvent) => {
    State.setScrolling(true);
    this.drag.x = e.x + State.scroll.x;
    this.drag.y = e.y + State.scroll.y;

    if (e.dataTransfer) {
      const img = new Image();
      img.src =
        'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
      e.dataTransfer.setDragImage(img, 0, 0);
    }
  };

  dragMove = (e: DragEvent) => {
    State.scroll.x = Math.max(0, -e.x + this.drag.x);
    State.scroll.y = Math.max(0, -e.y + this.drag.y);
  };

  dragEnd = (e: DragEvent) => {
    State.scroll.x = Math.max(0, -e.x + this.drag.x);
    State.scroll.y = Math.max(0, -e.y + this.drag.y);
    State.setScrolling(false);
  };

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  update(): void {}

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  renderPrepare(): void {}

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  renderOnMain(_mainContext: CanvasRenderingContext2D): void {}
}
