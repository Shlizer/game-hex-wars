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

  get showHex() {
    const { size, hover, select } = State.hex;
    return (
      <>
        <dt className={styles.section}>Hex</dt>
        <dt>Size</dt>
        <dd>{size.w >= 0 && size.h >= 0 ? `${size.w}x${size.h}` : '-'}</dd>
        <dt>Hover</dt>
        <dd>{hover.x >= 0 && hover.y >= 0 ? `${hover.x}x${hover.y}` : '-'}</dd>
        <dt>Select</dt>
        <dd>
          {select.x >= 0 && select.y >= 0 ? `${select.x}x${select.y}` : '-'}
        </dd>
      </>
    );
  }

  get showHexSelect() {
    const { x, y } = State.hex.select;
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
          {this.showMap}
          {this.showHex}
        </dl>
      </div>
    );
  }
}

decorate(Debug, {
  time: observable,
  showFPS: computed,
  showMouse: computed,
  showMap: computed,
  showHex: computed
});

export default observer(Debug);
