/* eslint-disable react/static-property-placement */
import { Point } from '../../../Definitions/helper';
import State from './state';
import Store from '..';

export default class Input {
  store: Store;
  drag: Point;

  constructor(store: Store, mainCanvas: HTMLCanvasElement) {
    this.store = store;
    this.drag = { x: 0, y: 0 };
    document.addEventListener('mousemove', this.getMouse);

    mainCanvas.addEventListener('dragstart', this.dragStart);
    mainCanvas.addEventListener('drag', this.dragMove);
    mainCanvas.addEventListener('dragend', this.dragEnd);
  }

  getMouse = (e: MouseEvent) => {
    const header = document.getElementById('titleBar')?.clientHeight || 0;
    const { map } = this.store.current;
    State.mouse.x = e.x - (map?.layout?.offset?.left || 0);
    State.mouse.y = e.y - (map?.layout?.offset?.top || 0) - header;
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
}
