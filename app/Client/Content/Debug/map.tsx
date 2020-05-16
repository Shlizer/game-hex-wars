/* eslint-disable class-methods-use-this */
import React from 'react';
import { decorate, computed } from 'mobx';
import { observer } from 'mobx-react';
import State from '../../Store/Engine/state';
import styles from './style.scss';

class DebugMap extends React.Component {
  get showMap() {
    const { x, y } = State.scroll;
    return (
      <>
        <dt className={styles.section}>Map</dt>
        <dt>Selection</dt>
        <dd>{State.map.selected || '-'}</dd>
        {State.map.selected ? (
          <>
            <dt>Scroll</dt>
            <dd>{x >= 0 && y >= 0 ? `${x}x${y}` : '-'}</dd>
            <dt>Size (px)</dt>
            <dd>{`${State.map.size.px.w}x${State.map.size.px.h}`}</dd>
            <dt>Size (hex)</dt>
            <dd>{`${State.map.size.hex.w}x${State.map.size.hex.h}`}</dd>
            <dt>Size (offset)</dt>
            <dd>{`${State.map.size.full.w}x${State.map.size.full.h}`}</dd>
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
