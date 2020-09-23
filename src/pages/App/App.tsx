import React from 'react';
import { Route } from 'react-router-dom';
import store from '../../store/index'
import './App.scss'
import HeadMenu from '../../base/HeadMenu'
import SideMenu from '../../base/SideMenu'
import Home from '../App/Home/Home'
import List from './List/List'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout,Breadcrumb } from "antd";
const { Header, Footer, Sider,Content } = Layout;
function handlePress(){
    console.log(100);
};
function App(){
    return (
        <div className="App" style={{ height:'100%' }}>
            <Layout style={{ height:'100%' }}>
                <Sider>
                    <SideMenu></SideMenu>
                </Sider>
                <Layout>
                    <Header style={{ padding:0 }}>
                        <HeadMenu theme="dark" onPress={handlePress} />
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
}
export default App;
