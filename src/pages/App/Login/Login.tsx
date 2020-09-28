import '../../../assets/scss/Login.scss'
import React from 'react';
import { withRouter } from "react-router-dom";
import { Card,Form, Input, Button,message } from 'antd';
import { UserOutlined, EllipsisOutlined, CheckOutlined } from '@ant-design/icons';
import $http from '../../../request/http'
import store from '../../../store/index'
import { setToken, setMenuList } from "../../../store/action";
import routers from "../../../router";
function Login(props){
    const getMenuList = ()=>{
        $http.get('/menuList').then((res)=>{
            if(res.success===true) {
                store.dispatch(setMenuList(res.obj.rows));
                props.history.push(routers.Home.path);
            } else {
                store.dispatch(setMenuList([]));
            }
        });
    };
    const onFinish = formData => {
        let data = new URLSearchParams(formData);
        $http.post('/login',data).then((res)=>{
            if(res.success===true) {
                store.dispatch(setToken(res.token));
                getMenuList();
            } else {
                store.dispatch(setMenuList([]));
                store.dispatch(setToken(''));
                message.error(res.msg);
            }
        }).catch((err)=>{
            message.error(err);
        });
    };

    return(
        <div className='login-card-box'>
            <Card className='login-card' title="Default size card">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: false }}
                    onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="用户名"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input
                            prefix={<EllipsisOutlined className="site-form-item-icon" />}
                            placeholder="密码" type="password"/>
                    </Form.Item>
                    <Form.Item>
                        <Button block icon={<CheckOutlined />} type="primary" htmlType="submit">login</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
export default withRouter(Login);
