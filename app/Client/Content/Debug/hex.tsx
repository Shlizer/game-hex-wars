/* eslint-disable class-methods-use-this */
import React from 'react';
import { decorate, computed } from 'mobx';
import { observer } from 'mobx-react';
import State from '../../Store/State';
import styles from './style.scss';

class DebugHex extends React.Component {
  get showHex() {
    const { size, hover, select } = State.hex;
    const sizeF = { w: Math.round(size.w), h: Math.round(size.h) };
    return (
      <>
        <dt className={styles.section}>Hex</dt>
        <dt>Size</dt>
        <dd>{size.w >= 0 && size.h >= 0 ? `${sizeF.w}x${sizeF.h}` : '-'}</dd>
        <dt>Hover</dt>
        <dd>{hover.x >= 0 && hover.y >= 0 ? `${hover.x}x${hover.y}` : '-'}</dd>
        <dt>Select</dt>
        <dd>
          {select.x >= 0 && select.y >= 0 ? `${select.x}x${select.y}` : '-'}
        </dd>
      </>
    );
  }

  render() {
    return this.showHex;
  }
}

decorate(DebugHex, {
  showHex: computed
});

export default observer(DebugHex);
