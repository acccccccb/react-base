import Abc from '../pages/App/Abc/Abc'
import App from '../pages/App/App'
import Home from '../pages/App/Home/Home'
import List from '../pages/App/List/List'
import Login from '../pages/App/Login/Login'
import NoMatch from '../pages/App/NoMatch/NoMatch'
import Error from '../pages/App/Error/Error'
import NoPermission from '../pages/App/NoPermission/NoPermission'

const routes = {
    App:{
        path:'/',
        exact: false,
        component: App,
    },
    Login:{
        name:'登录',
        path:'/Login',
        exact: true,
        component: Login,
    },
    Home:{
        name:'主页',
        path:'/Home',
        exact: true,
        component: Home,
    },
    List:{
        name:'列表',
        path:'/List',
        exact: true,
        component: List,
    },
    NoMatch:{
        name:'404',
        path:'/404',
        exact: true,
        component: NoMatch,
    },
    Error:{
        name:'500',
        path:'/500',
        exact: true,
        component: Error,
    },
    NoPermission:{
        name:'403',
        path:'/403',
        exact: true,
        component: NoPermission,
    },
    Abc: {
        name: 'Abc',
        path: '/Abc',
        exact: true,
        component: Abc
    },
};
export default routes;
