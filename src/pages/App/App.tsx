import './App.scss'
import React from 'react';
import store from '../../store/index'
import { Route, Switch } from 'react-router-dom';
import routers from '../../router/index'
import HeadMenu from '../../base/HeadMenu'
import SideMenu from '../../base/SideMenu'
import BreadCrumb from '../../base/BreadCrumb'
import { Layout } from "antd";
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
        super(props);
        let _this = this;
        _this.state =  {
            routers:[],
        };
        const checkLogin = () => {
            let token = store.getState().token;
            if(token) {
                $http.get('/menuList').then((res)=>{
                    store.dispatch(setMenuList(res.obj.rows));
                    props.history.push(routers.Home.path);
                    let routerList = Object.keys(routers);
                    routerList.splice(0,1);
                    _this.setState({
                        routers:routerList,
                    })
                });
            } else {
                // 清空
                store.dispatch(setMenuList([]));
                store.dispatch(setToken(''));
                props.history.push(routers.Login.path);
            }
        };
        checkLogin();
    }

    render() {
        let isLogin = store.getState().menuList;
        if(isLogin.length>1) {
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
                                <BreadCrumb></BreadCrumb>
                                {this.state['routers']}
                                <div className="site-layout-content">
                                    <Switch>
                                        {
                                            store.getState().menuList.map((item)=>{
                                                return(
                                                    <Route key={item.name} path={routers[item.name].path} exact={routers[item.name].exact} component={routers[item.name].component}/>
                                                )
                                            })
                                        }
                                    </Switch>
                                </div>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                        </Layout>
                    </Layout>
                </div>
            );
        } else {
            // 清空
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
