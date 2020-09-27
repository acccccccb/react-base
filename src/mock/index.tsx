import Mock from 'mockjs'
const Random = Mock.Random;
Mock.setup({
    timeout: 80
});
Mock.mock('/isLogin','get',{
    code:2000,
    success:true,
    token:Random.string('lower',32),
    msg:'已登录',
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
                name:'列表',
                type:2,
                url:'/List',
            },
        ],
    },
});

export default Mock;
