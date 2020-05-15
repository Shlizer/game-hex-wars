import React from 'react';
import { observer } from 'mobx-react';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from 'react-toasts';
import { StoreContext } from '../Store';
import MapChoose from './MapChoose';
import Canvas from './Canvas';
import Loading from './Loading';
import Cursor from './Cursor';
import CursorTest from './Cursor/test';
import styles from './style.scss';
import './style.global.scss';

const customPointer = false;

class Content extends React.Component {
  render() {
    return (
      <div
        className={[
          styles.content,
          customPointer ? styles.customPointer : ''
        ].join(' ')}
      >
        {this.context && this.context.current.map ? <Canvas /> : <MapChoose />}
        <Loading />
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />
        {customPointer ? <Cursor /> : null}
        {this.context && this.context.current.map ? null : <CursorTest />}
      </div>
    );
  }
}

Content.contextType = StoreContext;
export default observer(Content);
