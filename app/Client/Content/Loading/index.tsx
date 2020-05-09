/* eslint class-methods-use-this: off */

import React from 'react';
import { decorate, computed } from 'mobx';
import { observer } from 'mobx-react';
import Loader from '../../Store/Loader';
import styles from './style.scss';

class Loading extends React.Component {
  msg = '';

  get classes() {
    return [
      styles.loading,
      Loader.list.length ? styles.opened : styles.closed
    ].join(' ');
  }

  get loadWindow() {
    if (Loader.list.length && Loader.list[0]) {
      this.msg = Loader.list[0].text || '...';
    }
    return (
      <div className={styles.loadWindow}>
        <div className={styles.header}>Ładowanie</div>
        <div className={styles.info}>{this.msg}</div>
      </div>
    );
  }

  render() {
    return <div className={this.classes}>{this.loadWindow}</div>;
  }
}

decorate(Loading, {
  classes: computed,
  loadWindow: computed
});
export default observer(Loading);
