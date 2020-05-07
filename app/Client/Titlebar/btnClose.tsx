const windowHandle = require("electron").remote.getCurrentWindow();

import React from 'react';
import styles from './style.scss';

const onClose = () => windowHandle.close();

export default () => (
    <i className={[styles.btn, 'fa', 'fa-window-close'].join(' ')} onClick={onClose} />
);
