import Mock from 'mockjs'

Mock.setup({
    timeout: 80
});

Mock.mock('/login','post',{
    code:200,
    success:true,
    msg:'登录成功',
});
Mock.mock('/config','get',{
    code:200,
    success:true,
    msg:'查询成功',
    obj:{
        rows:[],
        total:0
    },
});
Mock.mock('/menuList','get',{
    code:200,
    success:true,
    msg:'查询成功',
    obj:{
        rows:[ // 1：分组   2：菜单
            {
                id:1,
                name:'首页',
                type:2,
                url:'/Home',
            },
            {
                id:2,
                name:'分组1',
                type:1,
                url:'/Home',
                children:[
                    {
                        id:3,
                        name:'菜单1',
                        type:2,
                        url:'/Home',
                    },
                    {
                        id:4,
                        name:'菜单2',
                        type:2,
                        url:'/List',
                    }
                ]
            },
            {
                id:5,
                name:'分组2',
                type:1,
                url:'/List',
                children:[
                    {
                        id:6,
                        name:'菜单3',
                        type:2,
                        url:'/Home',
                    },
                    {
                        id:7,
                        name:'菜单4',
                        type:2,
                        url:'/List',
                    }
                ]
            }
        ],
    },
});

export default Mock;
