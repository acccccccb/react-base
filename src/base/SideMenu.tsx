import React from "react";
import store from '../store'
import { addTabList } from "../store/action";
import { NavLink } from 'react-router-dom';
import { Menu } from "antd";
import { MailOutlined } from '@ant-design/icons';
import LogoSvg from "../static/images/logo.svg";
const { SubMenu } = Menu;

function SideMenu(){
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
                defaultSelectedKeys={['1']}
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
                                    <NavLink activeClassName="side-menu-active" data-id={item.id} to={item.url}>{item.name}</NavLink>
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
                                                        <NavLink activeClassName="side-menu-active" data-id={childItem.id} to={childItem.url}>{childItem.name}</NavLink>
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
export default SideMenu
