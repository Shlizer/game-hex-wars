import { decorate, observable } from 'mobx';
import { Point } from '../../../Definitions/helper';
import cursors, { icons } from './blue';

class Cursor {
  show = false;
  position: Point = { x: 0, y: 0 };
  icon: string = cursors.default;

  constructor() {
    document.addEventListener('mousemove', this.getMouse);
    window.addEventListener('mouseout', this.mouseOut);
  }

  getMouse = (e: MouseEvent) => {
    this.show = true;
    const header = document.getElementById('titleBar')?.clientHeight || 0;
    this.position.x = e.x;
    this.position.y = e.y - header;
  };

  mouseOut = () => {
    this.show = false;
  };

  setDefault() {
    this.icon = cursors.default;
  }

  setPointer() {
    this.icon = cursors.pointer;
  }

  setSelect() {
    this.icon = cursors.select;
  }

  setMove() {
    this.icon = cursors.move;
  }

  set(num: number) {
    this.icon = icons[num];
  }
}

decorate(Cursor, {
  show: observable,
  icon: observable,
  position: observable
});

const cur = new Cursor();

export default cur;
