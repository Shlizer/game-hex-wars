import React from 'react';
import MapChoose from './MapChoose';
import Canvas from './Canvas';
import Loading from './Loading';
import Map from '../../Store/map';
import styles from './style.scss';

export default ({currentMap}: {currentMap: Map | undefined}) => {
  console.log('rerender')
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
