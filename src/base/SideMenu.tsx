import React from "react";
import store from '../store'
import { Link } from 'react-router-dom';
import { Menu } from "antd";
import { MailOutlined } from '@ant-design/icons';
import LogoSvg from "../static/images/logo.svg";
const { SubMenu } = Menu;
function SideMenu(){
    // let menuList = store.getState().menuList;
    let menuList = [ // 1：分组   2：菜单
        {
            id:1,
            name:'分组',
            type:1,
            url:'/Home',
            children:[
                {
                    id:5,
                    name:'菜单2',
                    type:2,
                    url:'/Home',
                },
                {
                    id:6,
                    name:'菜单3',
                    type:2,
                    url:'/List',
                }
            ]
        },
        {
            id:2,
            name:'分组1',
            type:1,
            url:'/Home',
            children:[
                {
                    id:3,
                    name:'菜单2',
                    type:2,
                    url:'/Home',
                },
                {
                    id:4,
                    name:'菜单3',
                    type:2,
                    url:'/List',
                }
            ]
        }
    ];
    return(
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

                {
                    menuList.map((item) => {
                        if(item.type===2) {
                            return (
                                <Menu.Item key={item.id}>
                                    <Link to={item.url}>{item.name}</Link>
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
                                                        <Link to={childItem.url}>{childItem.name}</Link>
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
    );
}
export default SideMenu
