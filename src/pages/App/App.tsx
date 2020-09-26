import React from 'react';
import store from '../../store/index'
import { Route } from 'react-router-dom';
import './App.scss'
import HeadMenu from '../../base/HeadMenu'
import SideMenu from '../../base/SideMenu'
import Home from '../App/Home/Home'
import List from './List/List'
import Login from './Login/Login'
import $http from '../../request/http'
import { Dispatch } from 'redux'
import { Layout,Breadcrumb } from "antd";
import { connect } from 'react-redux'
import {setMenuList, setToken} from "../../store/action";
const { Header, Footer, Sider,Content } = Layout;

const mapDispatchProps = dispatch => {
    dispatch(setToken(Math.random()));
    return;
};
class App extends React.Component {
    // 组件初始化执行, 并且只执行一次
    componentDidMount() {
        console.log('组件初始化执行, 并且只执行一次');
        console.log(this.props);
        // const dispatch = this.props;
        // dispatch(setToken(Math.random()));
        // function getMenuList(){
        //     $http.get('/menuList').then((res)=>{
        //         dispatch(setMenuList(res.obj.rows));
        //     });
        // }
        // getMenuList();
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
        this.state = {
            isLogin:false,
            tabList:store.getState().tabList
        };
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
                                <HeadMenu theme="dark"/>
                            </Header>
                            <Content style={{ padding:'15px' }}>
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                                    <Breadcrumb.Item>List</Breadcrumb.Item>
                                    <Breadcrumb.Item>App</Breadcrumb.Item>
                                </Breadcrumb>
                                <div className="site-layout-content">
                                    <Route path="/Home" component={Home}/>
                                    <Route path="/List" component={List}/>
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
                    <Route path="*" component={Login}/>
                </div>
            )
        }
    }
}

const state = state => (state);
export default connect(
    state,mapDispatchProps
)(App);
