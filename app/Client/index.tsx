import { ipcRenderer, remote } from 'electron';
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { ToastsStore } from 'react-toasts';
import TitleBar from './Titlebar';
import Content from './Content';
import Store, { StoreContext } from './Store';
import './variables.global.css';
import './main.global.css';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;
const store = new Store();

ipcRenderer.on('error', (_error: unknown, msg: string) => {
  ToastsStore.error(msg);
});

document.addEventListener('app-error', msg => {
  if (msg instanceof CustomEvent) {
    ipcRenderer.sendTo(remote.getCurrentWebContents().id, 'error', msg.detail);
  }
});

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <StoreContext.Provider value={store}>
        <TitleBar />
        <Content />
      </StoreContext.Provider>
    </AppContainer>,
    document.getElementById('root')
  )
);
