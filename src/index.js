import React from 'react';
import './config'; // Import the Global vars
import ReactDOM from 'react-dom';
//import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';

ReactDOM.render((
  /*<BrowserRouter>
    <App />
  </BrowserRouter>*/
  /*
  Disabel BrowserRouter
  And Uncomment this HashRouter
  For a non-backend depedent (e.g. mobile)*/
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('root'));

serviceWorker.unregister();
