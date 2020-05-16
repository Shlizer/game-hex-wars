/* eslint-disable class-methods-use-this */
import React from 'react';
import { decorate, observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import styles from './style.scss';

class DebugFPS extends React.Component {
  mounted = false;
  time: { start: number; now: number; fps: number; stamps: number[] } = {
    start: performance.now(),
    now: performance.now(),
    stamps: [],
    fps: 0
  };

  componentDidMount() {
    this.mounted = true;
    window.requestAnimationFrame(this.checkFps);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  get showFPS() {
    if (this.time.fps <= 10) {
      return <span className={styles.poor}>{this.time.fps}</span>;
    }
    if (this.time.fps <= 35) {
      return <span className={styles.medium}>{this.time.fps}</span>;
    }
    return <span className={styles.good}>{this.time.fps}</span>;
  }

  checkFps = () => {
    this.time.now = performance.now();
    while (
      this.time.stamps.length > 0 &&
      this.time.stamps[0] <= this.time.now - 1000
    ) {
      this.time.stamps.shift();
    }
    this.time.stamps.push(this.time.now);
    this.time.fps = this.time.stamps.length;
    if (this.mounted) window.requestAnimationFrame(this.checkFps);
  };

  render() {
    return (
      <>
        <dt>FPS</dt>
        <dd>{this.showFPS}</dd>
      </>
    );
  }
}

decorate(DebugFPS, {
  time: observable,
  showFPS: computed
});

export default observer(DebugFPS);
