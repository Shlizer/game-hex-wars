import React from 'react'
import { ipcRenderer } from 'electron';
import styles from './style.scss';
import Picker from './picker';

export default class Menu extends React.Component {
    state = { 
        fetching: false,
        maps: []
     }
  
     componentDidMount() {
        this.fetchList()
    }

    fetchList() {
        this.setState({ fetching: true }, () => {
            const maps = ipcRenderer.sendSync("map-list-get")
            this.setState({ maps: maps || [] })
        })
    }

    render() {
        return (
            <div className={styles.menu}>
                {this.state.maps.map(data => <Picker {...data} />)}
            </div>
        )
    }
}