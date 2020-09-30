import React from 'react';
import store from '../../../store/index'
import { connect } from 'react-redux'
import { Button,Tabs,Table,message,Modal,Tag  } from 'antd';
import $http from '../../../request/http'
import { setToken } from '../../../store/action/index'
const TabPane = Tabs.TabPane;
const { Column } = Table;

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
        $http.post('/login',{
            username:'admin',
            password:123456
        }).then((res)=>{
            message.success(res.msg);
            _this.setState({
                result:JSON.stringify(res)
            });
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
    // 生命周期
    componentDidMount(){
        this.getTabData();
    }
    render(){
        return (
            <div className="Home">
                <Tabs>
                    <TabPane tab="Tab 1" key="1">
                        <Table pagination={{
                            position:['bottomLeft']
                        }}
                               loading={this.state['tableLoading']}
                               bordered
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
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
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
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
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
        );
    }
}
export default connect()(Home);
