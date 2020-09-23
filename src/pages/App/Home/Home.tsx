import React from 'react';
import { Button } from 'antd';
import $http from '../../../request/http'
function Home() {
    function get(){
        $http.get('https://api.aksqmny.com/getConfig').then((res)=>{
            console.log(res);
        });
    }
    return (
        <div className="Home">
            <Button type="primary" onClick={get}>发送请求</Button>
        </div>
    );
}

export default Home;
