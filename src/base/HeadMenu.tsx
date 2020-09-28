import React from "react";
import { NavLink,withRouter } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons'
import '../assets/scss/HeadMenu.scss'
import store from '../store'
import { removeTabList } from "../store/action";

function CloseBtn(props){
    const headMenuItemClose = (index)=>{
        let history = props.history;
        let path = store.getState().tabList[(index>0?index-1:0)].path;
        console.log(path);
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

function HeadMenu(props){ // 无状态组件
    let history = props.history;
    return (
        <div className="head-menu">
            {
                store.getState().tabList.map((item,index) => (
                    <div className='head-menu-item' key={item.id} >
                        <NavLink
                            to={item.path}
                        >
                            {item.name}
                        </NavLink>
                        <CloseBtn index={index} history={history}></CloseBtn>
                    </div>
                ))
            }
        </div>
    )
}
export default withRouter(HeadMenu)
