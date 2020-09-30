import '../assets/scss/SideMenu.scss'
import React from "react";
import store from '../store'
import router from '../router/index'
import { NavLink, withRouter } from 'react-router-dom';
import { Menu } from "antd";
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
            let obj:any = Object.keys(router);
            let searchObj = obj.filter((item)=>{
                return e.pathname === router[item].path;
            });
            if(searchObj.length>0) {
                let menuList = store.getState().menuList;
                if(menuList.length>0) {
                    let searchResult = this.searchObjByRoute(menuList,searchObj[0]);
                    if(searchResult.length>0) {
                        this.setState({
                            selectedKeys:[searchResult[0].id.toString()],
                        });
                    }
                }
            }
        });
    }
    componentWillUnmount() { // 防止注销后再登录报错
        this.setState = (state, callback) => {
            return;
        };
    }
        searchObjByRoute (arr,route) {
        let result:any = [];
        let list = arr;
        let loop = (arr,route)=>{
            arr.forEach((item)=>{
                if(item.children) {
                    loop(item.children,route);
                } else {
                    if(item.route===route){
                        result.push(item);
                    }
                }
            });
        };
        loop(list,route);
        return result;
    }
    handleMenuClick ({ item, key, keyPath, domEvent }) {
        this.setState({
            selectedKeys:[key],
        });
    }

    render(){
        let menuList = store.getState().menuList;
        let sideMenuClass = this.props['collapsed']?'side-menu side-menu-collapsed':'side-menu';
        return(
            <div className={sideMenuClass}>
                <Menu
                    theme="light"
                    selectedKeys={this.state['selectedKeys']}
                    defaultOpenKeys={['1']}
                    mode="inline"
                    onClick={({ item, key, keyPath, domEvent })=>{this.handleMenuClick({ item, key, keyPath, domEvent })}}
                >
                    <div className="logo">
                        <img alt="logo" className="logoImg" src={LogoSvg}/>
                        <span>React admin</span>
                    </div>

                    {
                        menuList.map((item) => {
                            if(item.type===2) {
                                return (
                                    <Menu.Item key={item.id}>
                                        <NavLink activeClassName="side-menu-active" data-id={item.id} to={router[item.route].path}><i className={item.icon}></i> <span className="menu-item-title">{item.name}</span></NavLink>
                                    </Menu.Item>
                                )
                            } else {
                                if(item.children) {
                                    return (
                                        <SubMenu
                                            key={item.id}
                                            title={
                                                <span>
                                                    <i className={item.icon}></i> <span className="menu-item-title"> {item.name}</span>
                                                </span>
                                            }>
                                            {
                                                item.children.map((childItem)=>{
                                                    return(
                                                        <Menu.Item key={childItem.id}>
                                                            <NavLink activeClassName="side-menu-active" data-id={childItem.id} to={router[childItem.route].path}><i className={childItem.icon}></i> <span className="menu-item-title">{childItem.name}</span></NavLink>
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
