import React from 'react';
import styles from './style.scss';

const windowHandle = require('electron').remote.getCurrentWindow();

const onClose = () => windowHandle.close();

export default function btnClose() {
  return (
    <i
      className={[styles.btn, 'fa', 'fa-window-close'].join(' ')}
      onClick={onClose}
    />
  );
}
