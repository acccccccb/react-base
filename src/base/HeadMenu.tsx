import React from "react";
import {Menu} from "antd";
import { Link } from 'react-router-dom';
import store from '../store'
function HeadMenu(props){ // 无状态组件
    const { theme } = props;
    return (
        <Menu theme={theme} mode="horizontal" defaultSelectedKeys={['1']}>
            {
                store.getState().menuList.map(item => (
                    <Menu.Item key={item.id}>
                        <Link to={item.url}>{item.name}</Link>
                    </Menu.Item>
                ))
            }
        </Menu>
    )
}
export default HeadMenu
