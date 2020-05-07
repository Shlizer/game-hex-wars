import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import TitleBar from './Titlebar';
import Content from './Content';
import './main.global.css';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <>
        <TitleBar />
        <Content />
      </>
    </AppContainer>,
    document.getElementById('root')
  )
);
