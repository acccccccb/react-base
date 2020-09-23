import { createStore } from "redux";

const store = createStore(()=>{
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
});
export default store
