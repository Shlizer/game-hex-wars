/* eslint-disable class-methods-use-this */
import React from 'react';
import { decorate, computed } from 'mobx';
import { observer } from 'mobx-react';
import State from '../../Store/State';
import styles from './style.scss';

class DebugControls extends React.Component {
  get grid() {
    const { show } = State.grid;
    return (
      <>
        <dt>
          <input type="checkbox" onClick={this.changeGrid} checked={show} />
        </dt>
        <dd>Show grid</dd>
      </>
    );
  }

  get gridCoord() {
    const { coord } = State.grid;
    return (
      <>
        <dt>
          <input
            type="checkbox"
            onClick={this.changeGridCoord}
            checked={coord}
          />
        </dt>
        <dd>Show coords</dd>
      </>
    );
  }

  get gridPath() {
    const { path } = State.grid;
    return (
      <>
        <dt>
          <input type="checkbox" onClick={this.changeGridPath} checked={path} />
        </dt>
        <dd>Show paths</dd>
      </>
    );
  }

  get mouseCustom() {
    return (
      <>
        <dt>
          <input
            type="checkbox"
            onClick={this.changeMouseCustom}
            checked={State.mouse.show}
          />
        </dt>
        <dd>Show cursor</dd>
      </>
    );
  }

  changeGrid = () => {
    State.grid.show = !State.grid.show;
  };

  changeGridCoord = () => {
    State.grid.coord = !State.grid.coord;
  };

  changeGridPath = () => {
    State.grid.path = !State.grid.path;
  };

  changeMouseCustom = () => {
    State.mouse.show = !State.mouse.show;
  };

  render() {
    return (
      <>
        <dt className={styles.section} />
        {this.grid}
        {this.gridCoord}
        {this.gridPath}
        {this.mouseCustom}
      </>
    );
  }
}

decorate(DebugControls, {
  grid: computed,
  gridCoord: computed,
  gridPath: computed,
  mouseCustom: computed
});

export default observer(DebugControls);
