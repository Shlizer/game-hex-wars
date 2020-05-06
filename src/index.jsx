// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// // import registerServiceWorker from './registerServiceWorker';

// // registerServiceWorker();

// function render(Component) {
//     ReactDOM.render(
//         <Component />,
//         document.getElementById('root')
//     );
// }

// render(App);

// if (module.hot) {
//     module.hot.accept('./App', () => {
//         const NextApp = require('./App').default;
//         render(NextApp);
//     })
// }

import * as React from 'react';
import * as ReactDOM from 'react-dom';

// const Index = () => {
//     return <div>Hello React!</div>;
// };

// ReactDOM.render(<Index />, document.getElementById('root'));

function render(Component) {
    ReactDOM.render(
        <Component />,
        document.getElementById('root')
    );
}

render(App);

if (module.hot) {
    console.log('HOT')
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(NextApp);
    })
} else
    console.log('NOT HOT')