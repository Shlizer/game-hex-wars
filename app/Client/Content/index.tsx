/* eslint-disable class-methods-use-this */
import React from 'react';
import { decorate, computed } from 'mobx';
import { observer } from 'mobx-react';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from 'react-toasts';
import { StoreContext } from '../Store';
import State from '../Store/Engine/state';
import MapChoose from './MapChoose';
import Debug from './Debug';
import Canvas from './Canvas';
import Loading from './Loading';
import Cursor from './Cursor';
import CursorTest from './Cursor/test';
import styles from './style.scss';
import './style.global.scss';

class Content extends React.Component {
  get classes() {
    return [
      styles.content,
      State.mouse.custom ? styles.customPointer : ''
    ].join(' ');
  }

  get cursor() {
    if (!State.mouse.custom) return null;
    return (
      <>
        <Cursor />
        {!State.map.selected ? null : <CursorTest />}
      </>
    );
  }

  render() {
    return (
      <div className={this.classes}>
        {State.map.selected ? (
          <>
            <Canvas />
            <Debug />
          </>
        ) : (
          <MapChoose />
        )}
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

decorate(Content, {
  classes: computed,
  cursor: computed
});

Content.contextType = StoreContext;
export default observer(Content);
