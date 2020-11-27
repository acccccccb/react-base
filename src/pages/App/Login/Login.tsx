import '../../../assets/scss/Login.scss'
import React from 'react';
// import HeadImg from '../../../static/images/avatar.jpg'
import { encode, decode } from 'js-base64'
import Logo from '../../../static/images/logo.svg'
import { withRouter } from "react-router-dom";
import {Card, Form, Input, Checkbox, Button, message, Avatar} from 'antd';
import { UserOutlined, EllipsisOutlined, CheckOutlined } from '@ant-design/icons';
import $http from '../../../request/http'
import store from '../../../store/index'
import {setToken, setMenuList, setUserInfo} from "../../../store/action";
import routers from "../../../router";
class Login extends React.Component {
    state={
        loginBtnLoading:false,
        theme: store.getState().theme,
        isSave: localStorage.getItem('isSave') === 'true',
        username: '',
        password: '',
        type: 'text'
    };
    UNSAFE_componentWillMount(): void {
        const username = localStorage.getItem('6dfaa7bd-cd4a-437c-809c-94a10ccf6952') || '';
        const password = localStorage.getItem('c0f8726a-c324-4c61-b66f-348eb5c7c530') || '';
        this.setState({
            username: username ? decode(username) : '-',
            password: username ? decode(password) : '',
        })
    }
    getMenuList = () => {
        $http.get('/menuList').then((res)=>{
            if(res.success===true) {
                store.dispatch(setMenuList(res.obj.rows));
                this.props['history'].push(routers.Home.path);
            } else {
                store.dispatch(setMenuList([]));
            }
        });
    };
    onFinish = (formData) => {
        let data = new URLSearchParams(formData);
        this.setState({
            loginBtnLoading:true,
        });
        console.log(formData);
        if(localStorage.getItem('isSave') === 'true') {
            localStorage.setItem('6dfaa7bd-cd4a-437c-809c-94a10ccf6952', encode(formData.username));
            localStorage.setItem('c0f8726a-c324-4c61-b66f-348eb5c7c530', encode(formData.password));
        } else {
            localStorage.removeItem('6dfaa7bd-cd4a-437c-809c-94a10ccf6952');
            localStorage.removeItem('c0f8726a-c324-4c61-b66f-348eb5c7c530');
        }
        $http.post('/login',data).then((res)=>{
            if(res.success===true) {
                store.dispatch(setToken(res.obj.token));
                store.dispatch(setUserInfo({
                    username:res.obj.username,
                    avatar:res.obj.avatar,
                }));
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
    savePassword = (e) => {
        if(e.target.checked === true) {
            localStorage.setItem('isSave', 'true');
        } else {
            localStorage.setItem('isSave', 'false');
        }
        this.setState({
            isSave: e.target.checked
        })
    };
    selectAll = (e) => {
        e.currentTarget.select();
    };
    render(){
        return(
            <div className={'login-card-box ' + this.state.theme}>
                <Card className='login-card'>
                    <div className='login-card-logo'>
                        <Avatar className="spin" size={70} src={Logo} shape="circle"/>
                        <div className="login-card-title">React admin</div>
                    </div>
                    <Form
                        initialValues={{
                            username: this.state.username,
                            password: this.state.password,
                        }}
                        autoComplete="off"
                        name="normal_login"
                        className="login-form"
                        size="large"
                        onFinish={this.onFinish}>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input
                                allowClear
                                autoFocus={ true }
                                onFocus={ this.selectAll }
                                disabled={this.state.loginBtnLoading}
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                value={this.state.username}
                                placeholder="用户名"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password
                                onFocus={ this.selectAll }
                                disabled={this.state.loginBtnLoading}
                                prefix={<EllipsisOutlined className="site-form-item-icon" />}
                                placeholder="密码"
                                type="password"
                            />
                        </Form.Item>
                        <div className="mb">
                            <div className="inline-block w50">
                                <Checkbox
                                    onChange={this.savePassword}
                                    checked={this.state.isSave}
                                >
                                    记住密码
                                </Checkbox>
                            </div>
                            <div className="text-right inline-block w50">
                                <a href="http://www.baidu.com">忘记密码？</a>
                            </div>
                        </div>
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
