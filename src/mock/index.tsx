import Mock from 'mockjs'
const Random = Mock.Random;
const toObject = (str)=>{
    let obj = {};
    let arr = str.split('&');
    arr.forEach((item)=>{
        let itemArr = item.split('=');
        obj[itemArr[0]] = itemArr[1];
    });
    return (obj)
};
Mock.setup({
    timeout: '200-600'
});
Mock.mock('/isLogin','get',{
    code:200,
    success:true,
    msg:'已登录',
});
Mock.mock('/login','post',(e)=>{
    let template = {
      username:'admin',
      password:'123456'
    };
    let data = toObject(e.body);
    let valid = Mock.valid(template,data);
    if(valid.length===0) {
        return(
            {
                code:200,
                success:true,
                obj:{
                    token:Random.string('lower',32),
                    username:Random.cname(),
                    avatar:Random.image('32x32', '#ead6c1',Random.string('upper',1)),
                },
                msg:'登录成功',
            }
        )
    } else {
        return(
            {
                code:200,
                success:false,
                token:Random.string('lower',32),
                msg:'登录失败,'+valid[0].message,
            }
        )
    }
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
Mock.mock('/menuList','get',()=>{
    return(
        {
            code:200,
            success:true,
            msg:'查询成功',
            obj:{
                rows:[ // 1：分组   2：菜单
                    {
                        id:1,
                        name:'首页',
                        type:2,
                        icon:'fa fa-home',
                        route:'Home',
                    },
                    {
                        id:2,
                        name:'更新日志',
                        type:2,
                        icon:'fa fa-calendar',
                        route:'List',
                    },
                    {
                        id:9,
                        name:'ABC',
                        type:2,
                        icon:'fa fa-calendar',
                        route:'Abc',
                    },
                    {
                        id:3,
                        name:'异常页',
                        icon:'fa fa-bars',
                        type:1,
                        children:[
                            {
                                id:4,
                                name:'403',
                                icon:'fa fa-cube',
                                type:2,
                                route:'NoPermission',
                            },
                            {
                                id:5,
                                name:'404',
                                icon:'fa fa-cube',
                                type:2,
                                route:'NoMatch',
                            },
                            {
                                id:6,
                                name:'500',
                                icon:'fa fa-cube',
                                type:2,
                                route:'Error',
                            },
                        ]
                    },
                ],
            },
        }
    )
});
Mock.mock('/getTabData','get',(e)=>{
    let data:any[] = [];
    for(let i=0;i<10000;i++) {
        data.push({
            key: i,
            firstName: Random.first(),
            lastName: Random.last(),
            age: Random.integer( 15, 75 ),
            address: Random.region()+''+Random.province()+''+Random.city(),
            tags: ['nice', 'developer'],
        })
    }
    return(
        {
            code:200,
            success:true,
            msg:'查询成功',
            obj:data,
        }
    )
});

export default Mock;
