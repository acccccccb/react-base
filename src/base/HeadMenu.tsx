import React from "react";
import { NavLink } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons'
import '../assets/scss/HeadMenu.scss'
import store from '../store'
import { removeTabList } from "../store/action";

class CloseBtn extends React.Component{
    constructor(props){
        super(props);
        console.log('props',props);
    }
    render(){
        const headMenuItemClose = (index)=>{
            store.dispatch(removeTabList(index));
        };
        // if(this.props.index>0) {
        //     return (
        //         <CloseOutlined onClick={()=>{headMenuItemClose(props.index)}} className="head-menu-item-close"></CloseOutlined>
        //     )
        // } else {
        //     return(null);
        // }
        return(
            <CloseOutlined onClick={()=>{headMenuItemClose(1)}} className="head-menu-item-close"></CloseOutlined>
        );
    }
}
function HeadMenu(){ // 无状态组件
    return (
        <div className="head-menu">
            {
                store.getState().tabList.map((item,index) => (
                    <NavLink
                        key={item.id}
                        to={item.url}
                    >
                        {item.name}
                        <CloseBtn></CloseBtn>
                    </NavLink>
                ))
            }
        </div>
    )
}
export default HeadMenu
