/* eslint class-methods-use-this: off */

import React from 'react';
import { decorate, computed } from 'mobx';
import { observer } from 'mobx-react';
import Loader from '../../Store/loader';
import styles from './style.scss';

class Loading extends React.Component {
  lastSeen = '';

  get classes() {
    return [
      styles.loading,
      Loader.loadData.length ? styles.opened : styles.closed
    ].join(' ');
  }

  get getInfo() {
    if (Loader.loadData[0]) {
      this.lastSeen = Loader.loadData[0].text || '...';
    }
    return this.lastSeen;
  }

  get loadWindow() {
    return (
      <div className={styles.loadWindow}>
        <div className={styles.header}>Ładowanie</div>
        <div className={styles.info}>{this.getInfo}</div>
      </div>
    );
  }

  render() {
    return <div className={this.classes}>{this.loadWindow}</div>;
  }
}

decorate(Loading, {
  classes: computed,
  getInfo: computed
});
export default observer(Loading);
