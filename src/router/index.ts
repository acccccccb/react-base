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
        path:'/Login',
        exact: false,
        component: Login,
    },
    Home:{
        path:'/Home',
        exact: false,
        component: Home,
    },
    List:{
        path:'/List',
        exact: false,
        component: List,
    },
    NoMatch:{
        path:'/*',
        exact: false,
        component: NoMatch,
    },
};
export default routes;
