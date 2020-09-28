import App from '../pages/App/App'
import Home from '../pages/App/Home/Home'
import List from '../pages/App/List/List'
import Login from '../pages/App/Login/Login'
import NoMatch from '../pages/App/NoMatch/NoMatch'
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
        path:'/NoMatch',
        exact: true,
        component: NoMatch,
    },
};
export default routes;
