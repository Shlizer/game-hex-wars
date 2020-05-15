import React from 'react';
import { decorate, observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import Engine from '../Store/Engine';
import { mouse, hex } from '../Store/Engine/state';
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

  // eslint-disable-next-line class-methods-use-this
  get showFPS() {
    const txt = `FPS ${this.time.fps}`;
    return <div>{txt}</div>;
  }

  // eslint-disable-next-line class-methods-use-this
  get showMouse() {
    const { x, y } = mouse;
    const txt = `MOUSE ${x >= 0 && y >= 0 ? `${x}x${y}` : '-'}`;
    return <div>{txt}</div>;
  }

  // eslint-disable-next-line class-methods-use-this
  get showHex() {
    const { x, y } = hex;
    const txt = `HEX ${x >= 0 && y >= 0 ? `${x}x${y}` : '-'}`;
    return <div>{txt}</div>;
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
        {this.showFPS}
        {this.showMouse}
        {this.showHex}
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
