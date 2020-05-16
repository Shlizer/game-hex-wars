/* eslint-disable class-methods-use-this */
import React from 'react';
import { decorate, computed } from 'mobx';
import { observer } from 'mobx-react';
import State from '../../Store/Engine/state';

class DebugMouse extends React.Component {
  get showMouse() {
    const { x, y } = State.mouse.position;
    return x >= 0 && y >= 0 ? `${x}x${y}` : '-';
  }

  render() {
    return (
      <>
        <dt>Mouse pos.</dt>
        <dd>{this.showMouse}</dd>
      </>
    );
  }
}

decorate(DebugMouse, {
  showMouse: computed
});

export default observer(DebugMouse);
