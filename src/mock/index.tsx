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
    timeout: 200
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
                token:Random.string('lower',32),
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
                        name:'列表',
                        type:2,
                        icon:'fa fa-wechat',
                        route:'List',
                    },
                    {
                        id:3,
                        name:'菜单组',
                        icon:'fa fa-car',
                        type:1,
                        children:[
                            {
                                id:4,
                                name:'登录',
                                icon:'fa fa-cube',
                                type:2,
                                route:'Login',
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
