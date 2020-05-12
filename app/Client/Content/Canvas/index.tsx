import React from 'react';
import { decorate, observable } from 'mobx';
import { observer } from 'mobx-react';
import Store, { StoreContext } from '../../Store';
import Engine from '../Engine';
import Debug from '../debug';
import styles from './style.scss';

class Canvas extends React.Component {
  ref = React.createRef<HTMLCanvasElement>();
  engine?: Engine;

  componentDidMount() {
    window.requestAnimationFrame(this.checkSize);
    if (this.ref.current && this.context instanceof Store) {
      this.engine = new Engine(this.ref.current, this.context);
    }
  }

  get parent(): HTMLElement | null {
    return this.ref.current ? this.ref.current.parentElement : null;
  }

  checkSize = () => {
    if (this.ref.current && this.parent) {
      if (this.ref.current.width !== this.parent.clientWidth) {
        this.ref.current.width = this.parent.clientWidth - 10;
      }
      if (this.ref.current.height !== this.parent.clientHeight) {
        this.ref.current.height = this.parent.clientHeight - 10;
      }
    }
    window.requestAnimationFrame(this.checkSize);
  };

  render() {
    return (
      <>
        <canvas className={styles.canvas} ref={this.ref} />
        {this.ref.current && this.engine ? (
          <Debug canvas={this.ref.current} engine={this.engine} />
        ) : null}
      </>
    );
  }
}

decorate(Canvas, {
  ref: observable,
  engine: observable
});

Canvas.contextType = StoreContext;
export default observer(Canvas);
