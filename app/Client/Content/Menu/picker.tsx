import React from 'react'
import styles from './style.scss';

type Props = {
    name: string;
    author:string;
    description: string;
  };

export default function Picker(props : Props) {
    return (
        <div className={styles.picker}>
            <div className={styles.title}>{props.name}</div>
            <div className={styles.author}>{props.author}</div>
            <div className={styles.description}>{props.description}</div>
        </div>
    )
}