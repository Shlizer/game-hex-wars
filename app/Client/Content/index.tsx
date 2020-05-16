import React from 'react';
import { observer } from 'mobx-react';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from 'react-toasts';
import { StoreContext } from '../Store';
import State from '../Store/Engine/state';
import MapChoose from './MapChoose';
import Canvas from './Canvas';
import Loading from './Loading';
import Cursor from './Cursor';
import CursorTest from './Cursor/test';
import styles from './style.scss';
import './style.global.scss';

const customPointer = false;

class Content extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  get cursor() {
    return (
      <>
        {customPointer ? <Cursor /> : null}
        {customPointer && !State.map.selected ? null : <CursorTest />}
      </>
    );
  }

  render() {
    return (
      <div
        className={[
          styles.content,
          customPointer ? styles.customPointer : ''
        ].join(' ')}
      >
        {State.map.selected ? <Canvas /> : <MapChoose />}
        <Loading />
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />
        {this.cursor}
      </div>
    );
  }
}

Content.contextType = StoreContext;
export default observer(Content);
