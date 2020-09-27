import React from 'react';
import store from '../../store/index'
import { Route } from 'react-router-dom';
import routers from '../../router/index'
import './App.scss'
import HeadMenu from '../../base/HeadMenu'
import SideMenu from '../../base/SideMenu'
import { Layout,Breadcrumb } from "antd";
import { connect } from 'react-redux'
import { setToken, setMenuList } from "../../store/action";
import $http from '../../request/http'
const { Header, Footer, Sider,Content } = Layout;

class App extends React.Component {
    // 组件初始化执行, 并且只执行一次
    componentDidMount() {
        console.log('组件初始化执行, 并且只执行一次');
    }
    // 组件卸载的时候才会执行, 可以做销毁动作
    componentWillUnmount() {
        console.log('组件卸载的时候才会执行');
    }
    // 组件出错的时候会执行
    componentDidCatch(error, info) {
        console.log('组件出错的时候会执行');
        console.log(error);
        console.log(info);
    }
    // 挂载
    constructor(props) {
        console.log('挂载');
        const checkLogin = () => {
            $http.get('/isLogin').then((res)=>{
                let token = res.token || '';
                if(token && res.success===true) {
                    store.dispatch(setToken(token));
                    $http.get('/menuList').then((res)=>{
                        store.dispatch(setMenuList(res.obj.rows));
                        props.history.push(routers.Home.path);
                    });
                } else {
                    // 清空
                    store.dispatch(setMenuList([]));
                    store.dispatch(setToken(''));
                    props.history.push(routers.Login.path);
                }
            });
        };
        checkLogin();
        super(props);
    }

    render() {
        let isLogin = store.getState().token;
        if(isLogin) {
            return (
                <div className="App" style={{ height:'100%' }}>
                    <Layout style={{ height:'100%' }}>
                        <Sider>
                            <SideMenu/>
                        </Sider>
                        <Layout>
                            <Header style={{ padding:0 }}>
                                <HeadMenu/>
                            </Header>
                            <Content style={{ padding:'15px' }}>
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                                    <Breadcrumb.Item>List</Breadcrumb.Item>
                                    <Breadcrumb.Item>App</Breadcrumb.Item>
                                </Breadcrumb>
                                <div className="site-layout-content">
                                    <Route path={routers.Home.path} exact component={routers.Home.component}/>
                                    <Route path={routers.List.path} exact component={routers.List.component}/>
                                </div>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                        </Layout>
                    </Layout>
                </div>
            );
        } else {
            return(
                <div className="App" style={{ height:'100%' }}>
                    <Route path={routers.Login.path} component={routers.Login.component}/>
                </div>
            )
        }
    }
}

const state = state => (state);
export default connect(
    state
)(App);
