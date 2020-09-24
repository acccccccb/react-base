import React from 'react';
import { connect } from 'react-redux'
import { Button } from 'antd';
import $http from '../../../request/http'
import { setToken } from '../../../action/index'
function Home({ dispatch }) {
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
        console.log('changeStore');
        dispatch(setToken(1))
    }
    return (
        <div className="Home">
            <Button type="primary" onClick={get}>发送get请求</Button>
            <Button type="primary" onClick={post}>发送post请求</Button>
            <Button type="primary" onClick={changeStore}>修改STORE</Button>
        </div>
    );
}

export default connect()(Home);
