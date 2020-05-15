import React from 'react';
import { StoreContext } from '../../Store';
import Cursor from '../../Store/Cursor';
import { MapInfo } from '../../../Definitions/map';
import styles from './style.scss';

export default class Picker extends React.Component<MapInfo> {
  static mouseEnter = () => {
    Cursor.setPointer();
  };

  static mouseLeave = () => {
    Cursor.setDefault();
  };

  onSelect = () => {
    this.context.selectMap(this.props.id);
    Cursor.setDefault();
  };

  render() {
    return (
      <div
        className={styles.picker}
        onMouseEnter={Picker.mouseEnter}
        onMouseLeave={Picker.mouseLeave}
        onClick={this.onSelect}
      >
        <div className={styles.title}>{this.props.name}</div>
        <div className={styles.author}>{this.props.author}</div>
        <div className={styles.description}>{this.props.description}</div>
      </div>
    );
  }
}
Picker.contextType = StoreContext;
