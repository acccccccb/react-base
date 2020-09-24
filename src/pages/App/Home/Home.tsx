import React from 'react';
import { Button } from 'antd';
import $http from '../../../request/http'
function Home() {
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
            console.log(res);
        });
    }
    return (
        <div className="Home">
            <Button type="primary" onClick={get}>发送get请求</Button>
            <Button type="primary" onClick={post}>发送post请求</Button>
        </div>
    );
}

export default Home;
