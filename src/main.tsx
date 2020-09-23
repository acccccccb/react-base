import { createDevTools } from "redux-devtools";
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import store from './store/index'
import 'antd/dist/antd.css';
import './assets/scss/base.scss';
import App from './pages/App/App'
import * as serviceWorker from './serviceWorker';
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
      <LogMonitor theme="tomorrow" preserveScrollTop={false}></LogMonitor>
  </DockMonitor>
);
console.log(store.getState());
ReactDOM.render((
        <Router>
            <Route path="/" component={App}></Route>
        </Router>
    ),document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
