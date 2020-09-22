import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss'
import LogoSvg from '../../static/images/logo.svg'
import HeadMenu from '../../components/HeadMenu'
import Home from '../App/Home/Home'
import List from './List/List'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout,Menu, Breadcrumb } from "antd";
const { Header, Footer, Sider,Content } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
    handlePress = (e) => {
        console.log(e)
    };
    render(){
        let menuList = [
            {
                id:1,
                name:'Home',
                url:'/Home'
            },
            {
                id:2,
                name:'List',
                url:'/List'
            }
        ];
        return (
            <div className="App" style={{ height:'100%' }}>
                <Layout style={{ height:'100%' }}>
                    <Sider>
                        <Menu
                            theme="dark"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                        >
                            <div className="logo">
                                <img alt="logo" className="logoImg" src={LogoSvg}/>
                                React
                            </div>
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                              <MailOutlined />
                              <span>Navigation One</span>
                            </span>
                                }
                            >
                                <Menu.ItemGroup key="g1" title="Item 1">
                                    <Menu.Item key="1">Option 1</Menu.Item>
                                    <Menu.Item key="2">Option 2</Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.ItemGroup key="g2" title="Item 2">
                                    <Menu.Item key="3">Option 3</Menu.Item>
                                    <Menu.Item key="4">Option 4</Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                                <SubMenu key="sub3" title="Submenu">
                                    <Menu.Item key="7">Option 7</Menu.Item>
                                    <Menu.Item key="8">Option 8</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                            <SubMenu
                                key="sub4"
                                title={
                                    <span>
              <SettingOutlined />
              <span>Navigation Three</span>
            </span>
                                }
                            >
                                <Menu.Item key="9">Option 9</Menu.Item>
                                <Menu.Item key="10">Option 10</Menu.Item>
                                <Menu.Item key="11">Option 11</Menu.Item>
                                <Menu.Item key="12">Option 12</Menu.Item>
                            </SubMenu>
                        </Menu>
                        );
                    </Sider>
                    <Layout>
                        <Header style={{ padding:0 }}>
                            <HeadMenu theme="dark" menuList={menuList} onPress={this.handlePress} />
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
}
export default App;
