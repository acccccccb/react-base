import React from 'react';
import store from '../../../store/index'
import { connect } from 'react-redux'
import { Button } from 'antd';
import $http from '../../../request/http'
import { setToken,setMenuList } from '../../../store/action/index'
function Home({ dispatch }) {
    function getMenuList(){
        $http.get('/menuList').then((res)=>{
            dispatch(setMenuList(res.obj.rows));
        });
    }
    function get(){
        $http.get('/config').then((res)=>{
            console.log(res);
        });
    }
    function post(){
        $http.post('/login',{
            username:'admin',
            password:123456
        }).then((res)=>{
            console.log(res.success);
        });
    }
    function changeStore(){
        dispatch(setToken(Math.random()));
    }
    return (
        <div className="Home">
            <div style={{marginBottom:'100px'}}>
                { JSON.stringify( store.getState()) }
            </div>
            <Button type="primary" onClick={get}>发送get请求</Button>
            <Button type="primary" onClick={post}>发送post请求</Button>
            <Button type="primary" onClick={changeStore}>修改TOKEN</Button>
            <Button type="primary" onClick={getMenuList}>修改MENULIST</Button>
        </div>
    );
}
export default connect()(Home);
