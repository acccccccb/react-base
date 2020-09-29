import '../../../assets/scss/Login.scss'
import React from 'react';
import { withRouter } from "react-router-dom";
import { Card,Form, Input, Button,message } from 'antd';
import { UserOutlined, EllipsisOutlined, CheckOutlined } from '@ant-design/icons';
import $http from '../../../request/http'
import store from '../../../store/index'
import { setToken, setMenuList } from "../../../store/action";
import routers from "../../../router";
class Login extends React.Component {
    state={
        loginBtnLoading:false,
    };
    getMenuList = ()=>{
        $http.get('/menuList').then((res)=>{
            if(res.success===true) {
                store.dispatch(setMenuList(res.obj.rows));
                this.props['history'].push(routers.Home.path);
            } else {
                store.dispatch(setMenuList([]));
            }
        });
    };
    onFinish = formData => {
        let data = new URLSearchParams(formData);
        this.setState({
            loginBtnLoading:true,
        });
        $http.post('/login',data).then((res)=>{
            if(res.success===true) {
                store.dispatch(setToken(res.token));
                this.getMenuList();
            } else {
                store.dispatch(setMenuList([]));
                store.dispatch(setToken(''));
                message.error(res.msg);
                this.setState({
                    loginBtnLoading:false,
                });
            }
        }).catch((err)=>{
            message.error(err);
            this.setState({
                loginBtnLoading:false,
            });
        });
    };
    render(){
        return(
            <div className='login-card-box'>
                <Card className='login-card' title="Login">
                    <Form
                        initialValues={{
                            username:'admin',
                            password:'123456',
                        }}
                        name="normal_login"
                        className="login-form"
                        size="large"
                        onFinish={this.onFinish}>
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
                            <Button loading={this.state['loginBtnLoading']} block icon={<CheckOutlined />} type="primary" htmlType="submit">login</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default withRouter(Login);
