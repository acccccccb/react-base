import React from "react";
import {Breadcrumb} from "antd";
import { withRouter } from 'react-router-dom';
import router from "../router";
import store from "../store";

class BreadCrumb extends React.Component <{
    history?:any,
}>{
    state={
      breadCrumbPath:  ['App']
    };
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
    constructor(props) {
        super(props);
        this.props.history.listen((e)=>{
            let obj:any = Object.keys(router);
            let searchObj = obj.filter((item)=>{
                return e.pathname === router[item].path;
            });
            let menuList = store.getState().menuList;
            if(menuList.length>0) {
                if(searchObj.length>0) {
                    let selected = this.searchObjByRoute(menuList,searchObj[0]);
                    this.setState({
                        breadCrumbPath:  ['App',selected[0]?selected[0].name:'-']
                    })
                }
            }
        });
    }
    componentWillUnmount() { // 防止注销后再登录报错
        this.setState = (state, callback) => {
            return;
        };
    }
    render(){
        return(
            <Breadcrumb separator={'>'} style={{ padding: '10px' }}>
                {
                    this.state['breadCrumbPath'].map((item)=>{
                        return(
                            <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
                        )
                    })
                }
            </Breadcrumb>
        )
    }
}
export default withRouter(BreadCrumb)
