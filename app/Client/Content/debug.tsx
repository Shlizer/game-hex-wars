import React from 'react';
import { decorate, observable } from 'mobx';
import { observer } from 'mobx-react';
import Engine from '../Store/Engine';

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
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '5px',
          backgroundColor: 'rgba(0,0,0,0.4)'
        }}
      >
        {this.time.fps}
      </div>
    );
  }
}

decorate(Debug, {
  time: observable
});

export default observer(Debug);
