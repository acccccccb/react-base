import React from 'react';
import { Provider } from 'react-redux'
import store from './store/index'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import 'antd/dist/antd.css';
import './assets/scss/base.scss';
import routers from './router/index'
import * as serviceWorker from './serviceWorker';
require('./mock/index');

class Main extends React.Component {
    // 组件初始化或更新都会执行, 在componentDidMount前和shouldComponentUpdate(需返回true)后执行
    render(){
        return (
            <Provider store={ store } >
                <Router>
                    <Route path={routers.App.path} exact={routers.App.exact} component={routers.App.component}></Route>
                </Router>
            </Provider>
        )
    }
}
ReactDOM.render(
    <Main/>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
