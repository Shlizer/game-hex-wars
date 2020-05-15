/* eslint-disable class-methods-use-this */
import React from 'react';
import { decorate, observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import Engine from '../Store/Engine';
import State from '../Store/Engine/state';
import styles from './style.scss';

type Props = {
  canvas: HTMLCanvasElement;
  engine: Engine;
};

class Debug extends React.Component<Props> {
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

  get showMouse() {
    const { x, y } = State.mouse;
    return x >= 0 && y >= 0 ? `${x}x${y}` : '-';
  }

  get showScroll() {
    const { x, y } = State.scroll;
    return x >= 0 && y >= 0 ? `${x}x${y}` : '-';
  }

  get showHex() {
    const { x, y } = State.hex;
    return x >= 0 && y >= 0 ? `${x}x${y}` : '-';
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
      <div className={styles.debug}>
        <dl>
          <dt>FPS</dt>
          <dd>{this.showFPS}</dd>
          <dt>Mouse pos.</dt>
          <dd>{this.showMouse}</dd>
          <dt>Map scroll</dt>
          <dd>{this.showScroll}</dd>
          <dt>Hex hover</dt>
          <dd>{this.showHex}</dd>
        </dl>
      </div>
    );
  }
}

decorate(Debug, {
  time: observable,
  showMouse: computed,
  showHex: computed
});

export default observer(Debug);
