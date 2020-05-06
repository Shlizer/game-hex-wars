import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import './app.global.css';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;
const Index = () => <div>Hello React!</div>

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <Index />
    </AppContainer>,
    document.getElementById('root')
  )
);
