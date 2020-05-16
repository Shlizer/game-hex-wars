/* eslint-disable class-methods-use-this */

import React from 'react';
import { computed, decorate } from 'mobx';
import { observer } from 'mobx-react';
import State from '../../Store/Engine/state';
import CursorStore from '../../Store/Cursor';
import styles from './style.scss';

class Cursor extends React.Component {
  get position() {
    return {
      top: CursorStore.position.y,
      left: CursorStore.position.x
    };
  }

  get cursor() {
    console.log('show other cursor');
    return <img src={State.mouse.mode} alt="Cursor" />;
  }

  render() {
    return State.mouse.show && State.mouse.visible ? (
      <div className={styles.cursor} style={{ ...this.position }}>
        {this.cursor}
      </div>
    ) : null;
  }
}

decorate(Cursor, {
  position: computed,
  cursor: computed
});

export default observer(Cursor);
