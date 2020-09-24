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

export default Mock;
