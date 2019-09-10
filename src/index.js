import React from 'react';
import ReactDOM from 'react-dom';
import {positions, Provider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import './index.css';
import Game from './App';
import * as serviceWorker from './serviceWorker';

const options = {
  timeout: 3000,
  position: positions.TOP_CENTER,
};

const App = () => (
  <Provider template={AlertTemplate} {...options}>
    <Game />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
