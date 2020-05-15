/* eslint-disable class-methods-use-this */

import React from 'react';
import { computed, decorate } from 'mobx';
import { observer } from 'mobx-react';
import CursorStore from '../../Store/Cursor';
import styles from './style.scss';

class Cursor extends React.Component {
  get position() {
    return { top: CursorStore.position.y, left: CursorStore.position.x };
  }

  get cursor() {
    return <img src={CursorStore.icon} alt="Cursor" />;
  }

  render() {
    return CursorStore.show ? (
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
