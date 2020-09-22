import React, {FC} from "react";
import {Menu} from "antd";
import { Link } from 'react-router-dom';

class HeadMenu extends React.Component <{
    theme?:any,
    menuList?:any,
    onPress:(e?: any) => any,
}>{
    render(){
        const { onPress, theme } = this.props;
        return (
            <Menu theme={theme} mode="horizontal" defaultSelectedKeys={['1']}>
                {
                    this.props.menuList.map(item => (
                        <Menu.Item key={item.id} onClick={() => onPress(100)}>
                            <Link to={item.url}>{item.name}</Link>
                        </Menu.Item>
                    ))
                }
            </Menu>
        )
    }
}

export default HeadMenu
