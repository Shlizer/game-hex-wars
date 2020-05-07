import React from 'react';
import Close from './btnClose';
import styles from './style.scss';

export default () => (
    <div className={styles.titleBar}>
        <span className={styles.title}>Hex Wars</span>
        <span className={styles.buttons}>
            <Close />
        </span>
    </div>
);