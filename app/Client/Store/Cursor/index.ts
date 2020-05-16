import { action, observable } from 'mobx';
import State from '../Engine/state';
import cursors, { icons } from './blue';

class Cursor {
  static position = observable({ x: 0, y: 0 });

  static getMouse = action((e: MouseEvent) => {
    State.mouse.visible = true;
    const header = document.getElementById('titleBar')?.clientHeight || 0;
    Cursor.position.x = e.x;
    Cursor.position.y = e.y - header;
  });

  static mouseOut = action(() => {
    State.mouse.visible = false;
    console.log('mouse out');
  });

  static setDefault() {
    State.mouse.mode = cursors.default;
  }

  static setPointer() {
    State.mouse.mode = cursors.pointer;
  }

  static setSelect() {
    State.mouse.mode = cursors.select;
  }

  static setMove() {
    State.mouse.mode = cursors.move;
  }

  static set(num: number) {
    State.mouse.mode = icons[num];
  }
}

State.mouse.mode = cursors.default;
document.addEventListener('mousemove', Cursor.getMouse);
window.addEventListener('mouseout', Cursor.mouseOut);

export default Cursor;
