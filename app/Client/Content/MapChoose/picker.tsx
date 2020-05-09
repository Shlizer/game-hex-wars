import React from 'react'
import styles from './style.scss';
import { TypeInfo } from '../../../Definitions/map';

export default function Picker(props : TypeInfo) {
    const onSelect = () => {
      console.log('SELECT ', props.id)
    }

    return (
        <div className={styles.picker} onClick={onSelect}>
            <div className={styles.title}>{props.name}</div>
            <div className={styles.author}>{props.author}</div>
            <div className={styles.description}>{props.description}</div>
        </div>
    )
}
