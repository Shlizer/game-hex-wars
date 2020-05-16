/* eslint-disable class-methods-use-this */

import React from 'react';
import { computed, decorate } from 'mobx';
import { observer } from 'mobx-react';
import State from '../../Store/State';
import styles from './style.scss';

class Cursor extends React.Component {
  get style() {
    return {
      // pointerEvents: State.isScrolling ? 'all' : 'none',
      top: State.mouse.position.y,
      left: State.mouse.position.x
    };
  }

  get cursor() {
    return <img src={State.mouse.mode} alt="Cursor" />;
  }

  render() {
    return State.mouse.show && State.mouse.visible ? (
      <div
        draggable
        onDrag={e => e.preventDefault()}
        className={styles.cursor}
        style={this.style}
      >
        {this.cursor}
      </div>
    ) : null;
  }
}

decorate(Cursor, {
  style: computed,
  cursor: computed
});

export default observer(Cursor);
