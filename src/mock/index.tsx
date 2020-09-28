import Mock from 'mockjs'
const Random = Mock.Random;
Mock.setup({
    timeout: 80
});
Mock.mock('/isLogin','get',{
    code:200,
    success:true,
    msg:'已登录',
});
Mock.mock('/login','post',{
    code:200,
    success:true,
    token:Random.string('lower',32),
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
                name:'Home',
                type:2,
                path:'/Home',
            },
            {
                id:2,
                name:'List',
                type:2,
                path:'/List',
            },
        ],
    },
});

export default Mock;
