import React from 'react';
import config from '../../../../package.json'
import KeepAlive from 'react-activation'
import store from '../../../store/index'
import { connect } from 'react-redux'
import { Button,Tabs,Table,message,Modal,Tag,PageHeader, Descriptions  } from 'antd';
import $http from '../../../request/http'
import { setToken } from '../../../store/action/index'
import PerfectScrollbar from 'perfect-scrollbar'
const TabPane = Tabs.TabPane;
const { Column } = Table;
class HomeTable extends React.Component{
    state = {
        dataSource:[],
    };
    getTabData = ()=>{
        this.setState({
            tableLoading:true
        });
        $http.get('/getTabData').then((res)=>{
            if(res.success===true) {
                this.setState({
                    dataSource:res.obj,
                    tableLoading:false,
                })
            }
        });
    };
    componentDidMount(){
        this.getTabData();
    }
    render(){
        return(
            <Table pagination={{
                position:['bottomLeft']
            }}
                   loading={this.state['tableLoading']}
                   bordered
                   locale={ {emptyText:"暂无数据"} }
                   size={'small'}
                   dataSource={this.state['dataSource']}>
                <Column title="First Name" dataIndex="firstName" key="firstName" />
                <Column title="Last Name" dataIndex="lastName" key="lastName" />
                <Column title="Age" dataIndex="age" key="age" />
                <Column title="category" dataIndex="age" key="age" align="center"
                        render={(age) => {
                            if(parseInt(age)>40) {
                                return(<Tag color="red" key={age}>old</Tag>)
                            } else {
                                return(<Tag color="blue" key={age}>young</Tag>)
                            }
                        }}
                />
                <Column title="Address" dataIndex="address" key="address" />
            </Table>
        )
    }
}
class Home extends React.Component{
    // 初始data
    state = {
        dataSource:[],
        result:'noResult',
        modalVisible:false,
        tableLoading:false,
    };
    // methods
    goTo404 = ()=>{
      this.props['history'].push('/abcde');
    };
    showModal = () => {
        this.setState({
            modalVisible: true,
        });
    };
    hideModal = () => {
        this.setState({
            modalVisible: false,
        });
    };
    getMenuList = () =>{
        let _this = this;
        $http.get('/menuList').then((res)=>{
            message.success(res.msg);
            _this.setState({
                result:JSON.stringify(res)
            });
        });
    }
    get = () =>{
        let _this = this;
        $http.get('/config').then((res)=>{
            console.log(res);
            message.success(res.msg);
            _this.setState({
                result:JSON.stringify(res)
            });
        });
    }
    post= () =>{
        let _this = this;
        let data = new URLSearchParams({
            username:'admin',
            password:'123456'
        });
        $http.post('/login',data).then((res)=>{
            if(res.success===true) {
                message.success(res.msg);
                _this.setState({
                    result:JSON.stringify(res)
                });
            } else {
                message.warn(res.msg);
            }
        });
    }
    modalConfirm = () => {
        message.success('modalConfirm');
        this.hideModal();
    }
    modalCancel = () => {
        message.warning('modalCancel');
        this.hideModal();
    }
    changeStore = () =>{
        message.success('修改成功');
        store.dispatch(setToken(Math.random()));
    }

    // 生命周期
    componentDidMount(){
        console.log('componentDidMount');
        const $container = document.getElementById('container');
        if ($container) {
            new PerfectScrollbar('#container', {
                wheelSpeed: 1,
                wheelPropagation: true
            });
        }
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    render(){
        return (
            <KeepAlive>
                <div className="Home">
                    <Tabs>
                        <TabPane tab="说明" key="1">
                            <div className="site-page-header-ghost-wrapper">
                                <PageHeader
                                    title={config.name + '-' + config.version}
                                    subTitle={config.description}
                                    extra={[
                                        <Button key="2">Gitee</Button>,
                                        <Button key="1" type="primary">Github</Button>,
                                    ]}
                                >
                                    <Descriptions size="small" column={3}>
                                        <Descriptions.Item label="Author">{config.author}</Descriptions.Item>
                                        <Descriptions.Item label="Version">{config.version}</Descriptions.Item>
                                        <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
                                        <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
                                        <Descriptions.Item label="Remarks">
                                            Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
                                        </Descriptions.Item>
                                    </Descriptions>
                                </PageHeader>
                            </div>
                        </TabPane>
                        <TabPane tab="KeepAlive" key="2">
                            <HomeTable></HomeTable>
                        </TabPane>
                        <TabPane tab="Axios" key="3">
                            <div style={{marginBottom:'50px'}}>
                                RESULT:{ this.state['result'] }
                            </div>
                            <div style={{marginBottom:'50px'}}>
                                TOKEN:{ store.getState().token }
                            </div>
                            <Button style={{marginRight:'10px'}} type="primary" onClick={this.get}>发送get请求</Button>
                            <Button style={{marginRight:'10px'}} type="primary" onClick={this.post}>发送post请求</Button>
                            <Button style={{marginRight:'10px'}} type="primary" onClick={this.changeStore}>修改TOKEN</Button>
                            <Button style={{marginRight:'10px'}} type="primary" onClick={this.getMenuList}>修改MENULIST</Button>
                            <Button style={{marginRight:'10px'}} type="primary" onClick={this.showModal}>对话框</Button>
                            <Button style={{marginRight:'10px'}} type="primary" onClick={this.goTo404}>404</Button>
                        </TabPane>
                    </Tabs>
                    <Modal
                        title="Basic Modal"
                        visible={this.state['modalVisible']}
                        onOk={this.modalConfirm}
                        onCancel={this.modalCancel}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                </div>
            </KeepAlive>
        );
    }
}
export default connect()(Home);
