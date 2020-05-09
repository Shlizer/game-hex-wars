import React from 'react'
import styles from './style.scss';
import Store from '../../../Store';
import { MapInfoConfig } from '../../../Store/definitions';

export default function Picker(props : MapInfoConfig) {
    const onSelect = () => {
        Store.selectMap(props.id || '');
    }

    return (
        <div className={styles.picker} onClick={onSelect}>
            <div className={styles.title}>{props.name}</div>
            <div className={styles.author}>{props.author}</div>
            <div className={styles.description}>{props.description}</div>
        </div>
    )
}