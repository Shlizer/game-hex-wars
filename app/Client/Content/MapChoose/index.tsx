import React from 'react'
import { ipcRenderer, IpcRendererEvent } from 'electron';
import styles from './style.scss';
import Picker from './picker';
import { TypeInfo } from '../../../Definitions/map';

export default class Menu extends React.Component {
    state: {maps: TypeInfo[]} = {
        maps: []
     }

     componentDidMount() {
        ipcRenderer.send('map-list-request');
        ipcRenderer.on('map-list-data', (event: IpcRendererEvent, maps: TypeInfo[]) => this.setState({maps}))
    }

    get noMaps() {
        return (
            <div className={'styles.noMaps'}>Brak map do wyświetlenia</div>
        )
    }

    render() {
        return (
            <div className={styles.menu}>
                {
                    this.state.maps.length
                        ? this.state.maps.map(data => <Picker key={data.name} {...data} />)
                        : this.noMaps
                }
            </div>
        )
    }
}
