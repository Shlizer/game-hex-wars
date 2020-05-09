import React from 'react';
import MapChoose from './MapChoose';
import Canvas from './Canvas';
import Loading from './Loading';
import styles from './style.scss';

export default ({currentMap}: {currentMap: | undefined}) => {
  return (
    <div className={styles.content}>
      {
        currentMap
          ? <Canvas />
          : <MapChoose />
      }
      <Loading />
    </div>
  )
};
