import React from "react";
import store from '../store'
import { addTabList } from "../store/action";
import { NavLink, withRouter } from 'react-router-dom';
import { Menu } from "antd";
import { MailOutlined } from '@ant-design/icons';
import LogoSvg from "../static/images/logo.svg";
const { SubMenu } = Menu;
class SideMenu extends React.Component<{
    history?:any,
}> {
    state = {
        defaultSelectedKeys:['0'],
    };
    constructor(props) {
        super(props);
        this.props.history.listen((e)=>{
            let menuList = store.getState().menuList;
            let selected = menuList.filter((item)=>{
                return item.path === e.pathname;
            });
            let selectedId = selected[0]?selected[0].id:1;
            this.setState({
                selectedKeys:[selectedId.toString()],
            });
        });
    }
    render(){
        const handleMenuClick = ({ item, key, keyPath, domEvent })=>{
            let menuList = store.getState().menuList;
            let tabItem = menuList.filter((item)=>{
                return item.id === parseInt(key);
            });
            if(tabItem.length===1) {
                store.dispatch(addTabList(tabItem[0]));
            }
        };
        let menuList = store.getState().menuList;
        return(
            <div className="side-menu">
                <Menu
                    theme="dark"
                    selectedKeys={this.state['selectedKeys']}
                    defaultOpenKeys={['1']}
                    mode="inline"
                    onClick={({ item, key, keyPath, domEvent })=>{handleMenuClick({ item, key, keyPath, domEvent })}}
                >
                    <div className="logo">
                        <img alt="logo" className="logoImg" src={LogoSvg}/>
                        React
                    </div>

                    {
                        menuList.map((item) => {
                            if(item.type===2) {
                                return (
                                    <Menu.Item key={item.id}>
                                        <NavLink activeClassName="side-menu-active" data-id={item.id} to={item.path}>{item.name}</NavLink>
                                    </Menu.Item>
                                )
                            } else {
                                if(item.children) {
                                    return (
                                        <SubMenu
                                            key={item.id}
                                            title={
                                                <span>
                                                <MailOutlined />
                                                <span>{item.name}</span>
                                            </span>
                                            }>
                                            {
                                                item.children.map((childItem)=>{
                                                    return(
                                                        <Menu.Item key={childItem.id}>
                                                            <NavLink activeClassName="side-menu-active" data-id={childItem.id} to={childItem.path}>{childItem.name}</NavLink>
                                                        </Menu.Item>
                                                    )
                                                })
                                            }
                                        </SubMenu>
                                    )
                                }
                            }
                            return false;
                        })
                    }
                </Menu>
            </div>
        );
    }
}

export default withRouter(SideMenu)
