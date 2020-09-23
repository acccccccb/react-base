import React from "react";
import {Menu} from "antd";
import { Link } from 'react-router-dom';
import store from '../store'

function HeadMenu(props){ // 无状态组件
    const { onPress, theme } = props;
    let menuList = store.getState().menuList;
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
