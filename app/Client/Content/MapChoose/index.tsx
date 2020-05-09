import React from 'react';
import { decorate, computed } from 'mobx';
import { observer } from 'mobx-react';
import { StoreContext } from '../../Store';
import Map from '../../Store/Map/map';
import Picker from './picker';
import styles from './style.scss';

class Menu extends React.Component {
  get list(): Map[] {
    const { map } = this.context;

    return map && map.list ? map.list : [];
  }

  static get noMaps() {
    return <div className="styles.noMaps">Brak map do wyświetlenia</div>;
  }

  get menu() {
    if (this.list.length)
      return this.list.map((data: Map) => (
        <Picker key={data.info.name} {...data.info} />
      ));
    return Menu.noMaps;
  }

  render() {
    return <div className={styles.menu}>{this.menu}</div>;
  }
}

Menu.contextType = StoreContext;

decorate(Menu, {
  list: computed
});

export default observer(Menu);
