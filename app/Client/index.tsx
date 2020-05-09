import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import TitleBar from './Titlebar';
import Content from './Content';
import Store from '../Store';
import Map from '../Store/map';
import './variables.global.css';
import './main.global.css';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;
let currentMap: Map | undefined = undefined;

setInterval(() => (currentMap = Store.currentMap()), 200)

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <>
        <TitleBar />
        <Content currentMap={currentMap} />
      </>
    </AppContainer>,
    document.getElementById('root')
  )
);
