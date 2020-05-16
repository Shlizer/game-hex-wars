import React from 'react';
import { decorate, observable } from 'mobx';
import { observer } from 'mobx-react';
import Store, { StoreContext } from '../../Store';
import State from '../../Store/State';
import Engine from '../../Store/Engine';
import styles from './style.scss';

function checkLimitX(x: number): number {
  return Math.min(
    State.map.size.full.w - State.viewport.size.w,
    Math.max(0, x)
  );
}

function checkLimitY(y: number): number {
  return Math.min(
    State.map.size.full.h - State.viewport.size.h,
    Math.max(0, y)
  );
}

class Canvas extends React.Component {
  drag = { x: 0, y: 0 };
  ref = React.createRef<HTMLCanvasElement>();
  engine?: Engine;

  componentDidMount() {
    window.requestAnimationFrame(this.checkSize);
    if (this.ref.current && this.context instanceof Store) {
      this.engine = new Engine(this.ref.current);
    }
  }

  get parent(): HTMLElement | null {
    return this.ref.current ? this.ref.current.parentElement : null;
  }

  checkSize = () => {
    if (this.ref.current && this.parent) {
      const { width, height } = this.ref.current;
      const { clientWidth, clientHeight } = this.parent;
      if (width !== clientWidth || height !== clientHeight) {
        this.ref.current.width = clientWidth;
        this.ref.current.height = clientHeight;
        State.viewport.size = { w: clientWidth, h: clientHeight };
      }
    }
    window.requestAnimationFrame(this.checkSize);
  };

  dragStart = (e: React.DragEvent<HTMLCanvasElement>) => {
    State.isScrolling = true;
    this.drag.x = e.pageX + State.scroll.x;
    this.drag.y = e.pageY + State.scroll.y;

    if (e.dataTransfer) {
      const img = new Image();
      img.src =
        'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
      e.dataTransfer.setDragImage(img, 0, 0);
    }
  };

  dragMove = (e: React.DragEvent<HTMLCanvasElement>) => {
    State.mouse.position.x = e.pageX;
    State.mouse.position.y =
      e.pageY - (document.getElementById('titleBar')?.clientHeight || 0);
    State.scroll = {
      x: checkLimitX(-e.pageX + this.drag.x),
      y: checkLimitY(-e.pageY + this.drag.y)
    };
    e.preventDefault();
    e.stopPropagation();
  };

  dragEnd = (e: React.DragEvent<HTMLCanvasElement>) => {
    State.scroll = {
      x: checkLimitX(-e.pageX + this.drag.x),
      y: checkLimitY(-e.pageY + this.drag.y)
    };
    State.isScrolling = false;
  };

  render() {
    return (
      <canvas
        draggable
        onDragStart={this.dragStart}
        onDrag={this.dragMove}
        onDragEnd={this.dragEnd}
        className={styles.canvas}
        ref={this.ref}
      />
    );
  }
}

decorate(Canvas, {
  ref: observable,
  engine: observable
});

Canvas.contextType = StoreContext;
export default observer(Canvas);
