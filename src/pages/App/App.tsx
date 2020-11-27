import '../../assets/scss/App.scss'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import React from 'react'
import store from '../../store/index'
import PerfectScrollbar from 'perfect-scrollbar'
import { Route, Switch } from 'react-router-dom'
import routers from '../../router/index'
import HeadMenu from '../../base/HeadMenu'
import SideMenu from '../../base/SideMenu'
import BreadCrumb from '../../base/BreadCrumb'
import { Layout } from "antd"
import { BulbOutlined,BulbFilled,RightOutlined,LeftOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import {setToken, setMenuList, setTheme, setCollapsed} from "../../store/action"
import $http from '../../request/http'
const { Header, Footer, Sider,Content } = Layout

class App extends React.Component {
    // 组件初始化执行, 并且只执行一次
    componentDidMount() {
        console.log('组件初始化执行, 并且只执行一次');
        const $container = document.getElementById('container');
        if ($container) {
            const ps = new PerfectScrollbar('#container', {
                wheelSpeed: 1,
                wheelPropagation: true,
                swipeEasing: true
            });
            this.setState({
                scroll: ps
            })
        }
    }
    componentDidUpdate() {
        const scroll = this.state['scroll'];
        if(scroll) {
            scroll.update();
        }
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
        this.state =  {
            routers:[],
        };
        this.checkLogin();
    }
    changeMenuCollapsed(){
        let collapsed = store.getState().collapsed;
        store.dispatch(setCollapsed(!collapsed));
    }
    changeMenuTheme(){
        let theme = store.getState().theme;
        store.dispatch(setTheme(theme==='dark'?'light':'dark'));
    }
    checkLogin () {
        let token = store.getState().token;
        if(token) {
            $http.get('/menuList').then((res)=>{
                store.dispatch(setMenuList(res.obj.rows));
                const activeUrl = store.getState().activeUrl;
                // 判断下当前activeUrl是否在路由里 如果不在就返回首页
                const auth = Object.keys(routers);
                const filter = auth.filter((item) => {
                    return routers[item].path === activeUrl;
                });
                if(activeUrl && filter.length > 0) {
                    this.props['history'].push(activeUrl);
                } else {
                    this.props['history'].push(routers.Home.path);
                }
                let routerList = Object.keys(routers);
                routerList.splice(0,1);
                this.setState({
                    routers:routerList,
                });
            });
        } else {
            // 清空
            store.dispatch(setMenuList([]));
            store.dispatch(setToken(''));
            this.props['history'].push(routers.Login.path);
        }
    }
    render() {
        console.log('app render');
        let menuList = store.getState().menuList;
        let theme = store.getState().theme;
        let collapsed = store.getState().collapsed;
        let icon = collapsed?<RightOutlined />:<LeftOutlined />;
        let icon2 = theme === 'dark'?<BulbFilled />:<BulbOutlined />;
        let customSider = (
            <Sider collapsed={collapsed} className={'app-sider app-sider-' + theme} theme={'light'}>
                <SideMenu theme={theme} collapsed={collapsed}/>
                <div
                    onClick={()=>{this.changeMenuCollapsed()}}
                    className="collapsed-btn">
                    {icon}
                </div>
                <div
                    onClick={()=>{this.changeMenuTheme()}}
                    className="change-theme-btn">
                    {icon2}
                </div>
            </Sider>
        );
        let customHeader = (
            <Header style={{ padding:0,background:'none' }}>
                <HeadMenu/>
            </Header>
        );
        let customBreadCrumb = <BreadCrumb></BreadCrumb>;
        let customContainer = (
            <div className="site-layout-content" style={{padding: '15px'}}>
                <Switch>
                    {
                        store.getState().menuList.map((item)=>{
                            if(item.type===2) {
                                return(
                                    <Route key={item.id} path={routers[item.route].path} exact={routers[item.route].exact} component={routers[item.route].component}/>
                                )
                            } else {
                                return(
                                    item.children.map((childItem)=>{
                                        return(
                                            <Route key={childItem.id} path={routers[childItem.route].path} exact={routers[childItem.route].exact} component={routers[childItem.route].component}/>
                                        )
                                    })
                                )
                            }
                        })
                    }
                    <Route path="*" component={routers.NoMatch.component}></Route>
                </Switch>
            </div>
        );
        return (
            <div className={ 'App ' + theme } style={{ height:'100%' }}>
                <Layout style={{ height:'100%' }}>
                    { menuList.length>1 ? customSider : '' }
                    <Layout>
                        { menuList.length>1 ? customHeader : '' }
                        { menuList.length>1 ? customBreadCrumb : '' }
                        <Content id="container" className={'content-body'} style={{ padding:'0' }}>
                            { menuList.length>1 ? customContainer : <Route path={routers.Login.path} component={routers.Login.component}/> }
                        </Content>
                        <Footer className={'app-footer ' + theme}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

const state = state => (state);
export default connect(
    state
)(App);
