/* eslint-disable class-methods-use-this */

import React from 'react';
import { observer } from 'mobx-react';
import CursorStore from '../../Store/Cursor';

class CursorTest extends React.Component {
  static mouseEnter = (i: number) => {
    CursorStore.set(i);
  };

  static mouseLeave = () => {
    CursorStore.setDefault();
  };

  render() {
    return (
      <div>
        {Array(23)
          .fill(undefined)
          .map((_v, i: number) => (
            <div
              style={{
                display: 'inline-block',
                width: '100px',
                height: '100px',
                margin: '5px',
                background: 'rgba(255,255,255,0.2)'
              }}
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              onMouseEnter={() => CursorTest.mouseEnter(i)}
              onMouseLeave={CursorTest.mouseLeave}
            >
              {i + 1}
            </div>
          ))}
      </div>
    );
  }
}

export default observer(CursorTest);
