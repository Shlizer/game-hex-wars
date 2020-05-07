import React from 'react'
import { ipcRenderer } from 'electron';
import styles from './style.scss';

export default class Loading extends React.Component {
    state: {opened: Boolean} = {
        opened: false
     }
  
    render() {
        return this.state.opened
            ? <div className={styles.loading}>Ładowanie</div>
            : null
    }
}