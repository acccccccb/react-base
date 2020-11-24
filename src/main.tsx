import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/index';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom'; // HashRouter BrowserRouter
import { AliveScope } from 'react-activation'
import 'antd/dist/antd.css';
import './assets/scss/base.scss';
import routers from './router/index'
import * as serviceWorker from './serviceWorker';

// 只在开发环境加载mock
if(process.env.NODE_ENV==='development') {
    require('./mock/index');
}
class Main extends React.Component<{
    history?:any
}> {
    // 组件初始化或更新都会执行, 在componentDidMount前和shouldComponentUpdate(需返回true)后执行
    render(){
        return (
            <Provider store={ store } >
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <AliveScope>
                            <Route path={routers.App.path} exact={routers.App.exact} component={routers.App.component}></Route>
                        </AliveScope>
                    </Router>
                </PersistGate>
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
