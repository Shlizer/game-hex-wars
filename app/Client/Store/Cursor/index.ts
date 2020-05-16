import { action } from 'mobx';
import State from '../State';
import cursors, { icons } from './blue';

class Cursor {
  static mouseMove = action((e: MouseEvent) => {
    State.mouse.visible = true;
    State.mouse.position.x = e.x;
    State.mouse.position.y =
      e.y - (document.getElementById('titleBar')?.clientHeight || 0);
  });

  static mouseOut = action(() => {
    State.mouse.visible = false;
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

action(() => {
  if (State.isScrolling) {
    window.removeEventListener('mousemove', Cursor.mouseMove);
  } else {
    window.addEventListener('mousemove', Cursor.mouseMove);
  }
});

State.mouse.mode = cursors.default;
window.addEventListener('mousemove', Cursor.mouseMove);
window.addEventListener('mouseout', Cursor.mouseOut);

export default Cursor;
