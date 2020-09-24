import React from "react";
import {Menu} from "antd";
import { Link } from 'react-router-dom';
import store from '../store'

function HeadMenu(props){ // 无状态组件
    const { onPress, theme } = props;
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
    return (
        <Menu theme={theme} mode="horizontal" defaultSelectedKeys={['1']}>
            {
                menuList.map(item => (
                    <Menu.Item key={item.id} onClick={() => onPress(100)}>
                        <Link to={item.url}>{item.name}</Link>
                    </Menu.Item>
                ))
            }
        </Menu>
    )
}

export default HeadMenu
