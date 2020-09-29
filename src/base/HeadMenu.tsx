import React from "react";
import { NavLink,withRouter,Link } from 'react-router-dom';
import { Avatar, Badge,Popover, Button } from 'antd';
import { CloseOutlined,UserOutlined } from '@ant-design/icons'
import '../assets/scss/HeadMenu.scss'
import store from '../store'
import router from '../router/index'
import {addTabList,setMenuList, removeTabList, setToken} from "../store/action";

function CloseBtn(props){
    const headMenuItemClose = (index)=>{
        let history = props.history;
        let path = router[store.getState().tabList[(index>0?index-1:0)].route].path ;
        history.push(path);
        store.dispatch(removeTabList(index));
    };
    let index = props.index;
    if(index>0) {
        return(
            <CloseOutlined onClick={()=>{headMenuItemClose(index)}} className="head-menu-item-close head-menu-item-close-active"></CloseOutlined>
        )
    } else {
        return(null)
    }
}

class HeadMenu extends React.Component <{
    history?:any
}>{
    state = {
        popover:{
            text:<span>Title</span>,
            content:(
                <div className="user-info-menu-box">
                    <div className="item"><Link to={'/List'}>查看消息</Link></div>
                    <div className="item"><Button onClick={()=>{this.loginOut()}} type="link" style={{padding:0,textAlign:'left'}}>退出登录</Button></div>
                </div>
            ),
        }
    };

    componentDidMount(): void {
        this.props.history.listen((e)=>{
            let obj:any = Object.keys(router);
            let searchObj = obj.filter((item)=>{
                return e.pathname === router[item].path;
            });
            let menuList = store.getState().menuList;
            if(menuList.length>0) {
                let searchResult = this.searchObjByRoute(menuList,searchObj[0]);
                if(searchResult.length>=1) {
                    store.dispatch(addTabList(searchResult[0]));
                }
            }
        });
    }
    loginOut(){
        store.dispatch(setToken(''));
        // store.dispatch(setTabList(''));
        store.dispatch(setMenuList(''));
        this.props.history.push(router.Login.path);
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
    render(){
        return (
            <div className="head-menu-box">
                <div className="head-menu">
                    {
                        store.getState().tabList.map((item,index) => (
                            <div className='head-menu-item' key={item.id} >
                                <NavLink
                                    to={router[item.route].path}
                                >
                                    <i className={item.icon}></i> {item.name}
                                </NavLink>
                                <CloseBtn index={index} history={this.props.history}></CloseBtn>
                            </div>
                        ))
                    }
                </div>
                <div className="user-info-box">
                    <Popover placement="bottom" title={this.state['popover']['title']} content={this.state['popover']['content']} trigger="hover">
                        <Badge count={1}>
                            <Avatar shape="square" icon={<UserOutlined />} />
                        </Badge>
                        <span className="user-name">Admin</span>
                    </Popover>
                </div>
            </div>
        )
    }
}
export default withRouter(HeadMenu)
