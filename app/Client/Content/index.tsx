import React from 'react';
import { observer } from 'mobx-react';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { StoreContext } from '../Store';
import MapChoose from './MapChoose';
import Canvas from './Canvas';
import Loading from './Loading';
import styles from './style.scss';

class Content extends React.Component {
  render() {
    return (
      <div className={styles.content}>
        {this.context && this.context.current.map ? <Canvas /> : <MapChoose />}
        <Loading />
        <ToastsContainer store={ToastsStore} />
      </div>
    );
  }
}

Content.contextType = StoreContext;
export default observer(Content);
