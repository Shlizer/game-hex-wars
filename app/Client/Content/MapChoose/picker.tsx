import React from 'react';
import { StoreContext } from '../../Store';
import { TypeInfo } from '../../../Definitions/map';
import styles from './style.scss';

export default class Picker extends React.Component<TypeInfo> {
  onSelect = () => {
    this.context.selectMap(this.props.id);
  };

  render() {
    return (
      <div className={styles.picker} onClick={this.onSelect}>
        <div className={styles.title}>{this.props.name}</div>
        <div className={styles.author}>{this.props.author}</div>
        <div className={styles.description}>{this.props.description}</div>
      </div>
    );
  }
}
Picker.contextType = StoreContext;
