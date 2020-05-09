import React from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from '../Store';
import MapChoose from './MapChoose';
import Canvas from './Canvas';
import styles from './style.scss';

function Content() {
  return (
    <StoreContext.Consumer>
      {store => (
        <div className={styles.content}>
          {store && store.current.map ? <Canvas /> : <MapChoose />}
        </div>
      )}
    </StoreContext.Consumer>
  );
}

Content.contextType = StoreContext;
export default observer(Content);
