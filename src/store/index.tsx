import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { createDevTools } from "redux-devtools";
// import LogMonitor from 'redux-devtools-log-monitor'
// import DockMonitor from 'redux-devtools-dock-monitor'
import logger from 'redux-logger'
const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const reducer = ()=>{
    return {
        baseURL:'',
        token:'',
        menuList:[ // 1：分组   2：菜单
            {
                id:1,
                name:'分组',
                type:1,
                url:'/Home',
                children:[
                    {
                        id:5,
                        name:'菜单2',
                        type:2,
                        url:'/Home',
                    },
                    {
                        id:6,
                        name:'菜单3',
                        type:2,
                        url:'/List',
                    }
                ]
            },
            {
                id:2,
                name:'分组1',
                type:1,
                url:'/Home',
                children:[
                    {
                        id:3,
                        name:'菜单2',
                        type:2,
                        url:'/Home',
                    },
                    {
                        id:4,
                        name:'菜单3',
                        type:2,
                        url:'/List',
                    }
                ]
            }
        ]
    }
};
const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(logger),
        // other store enhancers if any
    )
);
export default store
