/* eslint-disable class-methods-use-this */
import React from 'react';
import { decorate, computed } from 'mobx';
import { observer } from 'mobx-react';
import State from '../../Store/State';
import styles from './style.scss';

class DebugMap extends React.Component {
  getClassScale(value: number) {
    if (value > 1.2) return styles.good;
    if (value < 0.9) return styles.poor;
    return styles.medium;
  }

  get showMap() {
    const { x, y } = State.scroll;
    const { px, hex, full } = State.map.size;
    const { scale } = State.viewport;

    return (
      <>
        <dt className={styles.section}>Map</dt>
        <dt>Selection</dt>
        <dd>{State.map.selected || '-'}</dd>
        {State.map.selected ? (
          <>
            <dt>Scale</dt>
            <dd className={this.getClassScale(scale)}>{scale}</dd>
            <dt>Scroll</dt>
            <dd>
              {x >= 0 && y >= 0 ? `${Math.round(x)}x${Math.round(y)}` : '-'}
            </dd>
            <dt>Size (px)</dt>
            <dd>{`${Math.round(px.w)}x${Math.round(px.h)}`}</dd>
            <dt>Size (hex)</dt>
            <dd>{`${hex.w}x${hex.h}`}</dd>
            <dt>Size (offset)</dt>
            <dd>{`${Math.round(full.w)}x${Math.round(full.h)}`}</dd>
          </>
        ) : null}
      </>
    );
  }

  render() {
    return this.showMap;
  }
}

decorate(DebugMap, {
  showMap: computed
});

export default observer(DebugMap);
