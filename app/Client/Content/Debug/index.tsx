/* eslint-disable class-methods-use-this */
import React from 'react';
import { observer } from 'mobx-react';
import DebugFps from './fps';
import DebugMouse from './mouse';
import DebugMap from './map';
import DebugHex from './hex';
import DebugControls from './controls';
import styles from './style.scss';

class Debug extends React.Component {
  render() {
    return (
      <div className={styles.debug}>
        <dl>
          <DebugFps />
          <DebugMouse />
          <DebugMap />
          <DebugHex />
          <DebugControls />
        </dl>
      </div>
    );
  }
}

export default observer(Debug);
