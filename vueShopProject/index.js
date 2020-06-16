var express = require("express");
var app = express();
//req客户端向服务器数据响应
//res服务器向客户端数据响应
app.use(express.static("./dist"));
//设置允许跨域访问该服务.
// app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header('Content-Type', 'application/json;charset=utf-8');
//     next();
// });

// get和post请求
app.get("/", function (req, res) {//  /就是首页  雷士路由
    res.send("你好");
})
app.get("/goodsApi", function (req, res) {// /hahaha 类似路由
    res.json({ name: "商品名称", price: "22", num: 1 })
})
// 在服务器中定义变量 重启服务器会被初始化
var userList = [];//全局变量变量
//先注册后登录
app.get("/login", function (req, res) {
    let { username, password } = req.query;
    if (username == "" && password == "") {
        return;//终止路由操作
    }
    console.log("登录成功");
    let data = userList.find(item => item.username == username);//找到就返回对象 找不到返回空
    console.log("返回对象", data);
    if (data && data.password == password) {
        res.send('200');
    } else {
        res.send('201');
    }

})

app.get("/register", function (req, res) {// /hahaha 类似路由
    // req.query 可以获取get请求的数据
    let { username, password, password2 } = req.query;
    if (username != "" && password == password2 && password != "") {
        userList.push({
            username,
            password
        })
        console.log("注册成功");
        res.send("200");
    } else {
        console.log("注册失败");
        res.send("201");
    }
})

//中间商品数据接口
app.get("/centerList", (req, res) => {
    var result = [
        {
            "top": {
                "top_img": "https://resource.smartisan.com/resource/6de89510353439b3864f3e226c69adee.png?x-oss-process=image/resize,w_990/format,webp",
                "goodsId": "goods001"
            },
            "shop": [
                {
                    "shop_img": "https://resource.smartisan.com/resource/a4c73e549097c7f5cf2c5e0d87e56d13.png?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods002",
                    "shop_name": "坚果 Pro 3 s2",
                    "shop_price": "3599",
                    "old_price": "3999"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/f195e666e089d4e3775ce67d8e9523ce.png?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods003",
                    "shop_name": "坚果 Pro 3 s1",
                    "shop_price": "2399",
                    "old_price": "2999"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/a5b6bf1f38fb88dceeb1e917bec288da.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods004",
                    "shop_name": "smartisan  颈挂蓝牙耳机",
                    "shop_price": "179",
                    "old_price": "399"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/9934374dda26c292555dd1ec0887e17b.png?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods005",
                    "shop_name": "坚果 Pro 3 x",
                    "shop_price": "2699",
                    "old_price": "2999"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/d159521e479b26f3c97a1e4f00a5aefd.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods006",
                    "shop_name": "smartisan  颈挂蓝牙耳机",
                    "shop_price": "179",
                    "old_price": "299"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/8e822aa7cbab24fec7eacf0bbb2f6526.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods007",
                    "shop_name": "坚果 弯头数据线（Type-C）",
                    "shop_price": "24.9",
                    "old_price": "29"
                }
            ]
        },
        {
            "top": {
                "top_img": "https://resource.smartisan.com/resource/255da19e6506dbf3ed4afe7d58391273.png?x-oss-process=image/resize,w_990/format,webp",
                "goodsId": "goods011"
            },
            "shop": [
                {
                    "shop_img": "https://resource.smartisan.com/resource/fa6e26d738d64a3ecfdae3286e28aeb8.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods012",
                    "shop_name": "APIYOO 皮卡丘声波儿童牙刷",
                    "shop_price": "289",
                    "old_price": "399"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/63cea2eeec303c66e62fbd94499868b9.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods013",
                    "shop_name": "FERACE智能健康手表",
                    "shop_price": "230",
                    "old_price": "399"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/3e4bc67b30c200b7fe7baae8acf960bc.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods014",
                    "shop_name": "smartisan  颈挂蓝牙耳机",
                    "shop_price": "179",
                    "old_price": "299"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/473b6b76cb3bc8bf6bfef8f7b85d97cb.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods015",
                    "shop_name": "ASPOR 无线TWS耳机",
                    "shop_price": "98",
                    "old_price": "199"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/4a5ed736d31b820d2c04709717a59d54.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods016",
                    "shop_name": "Remax便携式手持风扇",
                    "shop_price": "35",
                    "old_price": "99"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/a0a6a36bf42659c454d87e780f0973ce.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods017",
                    "shop_name": "佳奥泰国原装进口乳胶枕",
                    "shop_price": "230",
                    "old_price": "399"

                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/d809ff308b29aa93aabceb49fe5db3e7.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods018",
                    "shop_name": "SKG K5 颈椎按摩仪",
                    "shop_price": "539",
                    "old_price": "699"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/9064581e930dce1cb746aab03a99f250.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods019",
                    "shop_name": "公牛塑料车充CUB12H",
                    "shop_price": "39",
                    "old_price": "99"
                }
            ]
        },
        {
            "top": {
                "top_img": "https://resource.smartisan.com/resource/2a0a2f4bcf3c6058906944fc8b8c9e31.png?x-oss-process=image/resize,w_990/format,webp",
                "goodsId": "goods021"
            },
            "shop": [
                {
                    "shop_img": "https://resource.smartisan.com/resource/db1f9c8eadd0164a34e73465a34776a3.jpg?x-oss-process=image/resize,w_332/format,webp",
                    "goodsId": "goods022",
                    "shop_name": "坚果 Pro 3 足迹保护套 德国天文学家开普勒出生",
                    "shop_price": "39",
                    "old_price": "69"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/b69694515f503e9c5be2a056314a569e.jpeg?x-oss-process=image/resize,w_332/format,webp",
                    "goodsId": "goods023",
                    "shop_name": "坚果 Pro 3 足迹保护套 数学家哈密顿首次发现四元数",
                    "shop_price": "39",
                    "old_price": "99"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/b93f8e0265cf372e774d0a76e32f2c0f.png?x-oss-process=image/resize,w_332/format,webp",
                    "goodsId": "goods024",
                    "shop_name": "坚果 Pro 3 足迹保护套 克里斯蒂安·多普勒出生",
                    "shop_price": "39",
                    "old_price": "49"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/5bcb5d70f8c17efb0a2b4f9852a03128.jpg?x-oss-process=image/resize,w_332/format,webp",
                    "goodsId": "goods025",
                    "shop_name": "足迹保护套 克里斯蒂安·多普勒出生 for iPhone 11",
                    "shop_price": "55",
                    "old_price": "99"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/5888f9b53cd1184ac32f2ae778cd7804.jpg?x-oss-process=image/resize,w_332/format,webp",
                    "goodsId": "goods026",
                    "shop_name": "足迹保护套 莱卡成为第一只进入地球轨道的动物 for iPhone 11",
                    "shop_price": "55",
                    "old_price": "99"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/31c8be42fbbabad10490835d953be356.jpg?x-oss-process=image/resize,w_332/format,webp",
                    "goodsId": "goods027",
                    "shop_name": "坚果 Pro 3 足迹保护套 莫里斯·詹姆士·麦当劳出生",
                    "shop_price": "39",
                    "old_price": "99"
                }
            ]
        },
        {
            "top": {
                "top_img": "https://resource.smartisan.com/resource/e6f7b32e4a942fd4a8c436495febd022.png?x-oss-process=image/resize,w_990/format,webp",
                "goodsId": "goods031"
            },
            "shop": [
                {
                    "shop_img": "https://resource.smartisan.com/resource/e991f946530a7cfab3d9670dd8b1371b.png?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods032",
                    "shop_name": "Smartisan 真无线蓝牙耳机",
                    "shop_price": "199",
                    "old_price": "250"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/de1274f4c70fe3768417bb0454320089.png?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods033",
                    "shop_name": "坚果快充移动电源 20000mAh（45W MAX)",
                    "shop_price": "155",
                    "old_price": "199"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/6e96ccea3bd56bdd2243eb20330cec30.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods034",
                    "shop_name": "smartisan砖式蓝牙小音箱",
                    "shop_price": "99",
                    "old_price": "199"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/f6686f1babc3e18970082dcb21ff2a5e.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods035",
                    "shop_name": "坚果快充移动电源 10000mAh （18W max）",
                    "shop_price": "99",
                    "old_price": "199"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/834e8388b0017c457c98baa6545cdfb2.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods036",
                    "shop_name": "C-force  USB-C多功能转接器",
                    "shop_price": "148",
                    "old_price": "259"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/82aab62886740f165a3631ce6cffe895.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods037",
                    "shop_name": "坚果彩虹数据线",
                    "shop_price": "19",
                    "old_price": "39"
                }
            ]
        },
        {
            "top": {
                "top_img": "https://resource.smartisan.com/resource/09777b7407b16c76ac7b5cc3e1c9c0e0.png?x-oss-process=image/resize,w_640/format,webp",
                "goodsId": "goods041"
            },
            "shop": [
                {
                    "shop_img": "https://resource.smartisan.com/resource/b901d1e4d1671d3b40ab06903efa8b5b.png?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods042",
                    "shop_name": "落栗 T恤 条形码首次商业使用",
                    "shop_price": "134",
                    "old_price": "399"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/c537876371d7443d6622ee8feeb12135.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods043",
                    "shop_name": "落栗 T恤 弗里德里希·福禄贝尔出生",
                    "shop_price": "134",
                    "old_price": "199"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/e639c6b9bd7fbf3ebc9fa1cde17e01ec.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods044",
                    "shop_name": "落栗 T恤 林徽因出生",
                    "shop_price": "134",
                    "old_price": "299"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/1c13034d1028f3620d487c1db7184a51.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods045",
                    "shop_name": "Smartisan 帆布鞋",
                    "shop_price": "149",
                    "old_price": "299"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/f43da1331c769745d41286b0962a8d04.png?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods046",
                    "shop_name": "落栗 T恤 鲁迅出生",
                    "shop_price": "134",
                    "old_price": "199"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/a006279134054552b9d367eca783efd8.png?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods047",
                    "shop_name": "落栗 T恤 卡夫卡出生 ",
                    "shop_price": "134",
                    "old_price": "299"
                }
            ]
        },
        {
            "top": {
                "top_img": "https://resource.smartisan.com/resource/588e2099e68722fde92287aa90b7f3b9.png?x-oss-process=image/resize,w_990/format,webp",
                "goodsId": "goods041"
            },
            "shop": [
                {
                    "shop_img": "https://resource.smartisan.com/resource/f90eb5c8dd0b6221cfdc0b0c3bdd1b87.jpg?x-oss-process=image/resize,w_332/format,webp",
                    "goodsId": "goods052",
                    "shop_name": "GoBiggeR  便携式触屏显示器 ZB156TF",
                    "shop_price": "1519",
                    "old_price": "2000"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/2d5bac538fef9800aa5cd8420cfcdc12.jpg?x-oss-process=image/resize,w_332/format,webp",
                    "goodsId": "goods053",
                    "shop_name": "GoBiggeR 便携式触屏显示器 ZB133TF-W ",
                    "shop_price": "1329",
                    "old_price": "1999"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/84b472956d7facb9d7134f7569d3bd84.jpg?x-oss-process=image/resize,w_332/format,webp",
                    "goodsId": "goods054",
                    "shop_name": "GoBiggeR 便携式触屏显示器  ZB156UT",
                    "shop_price": "1879",
                    "old_price": "2500"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/df8c296ccf8f78af57901d213c24d5a7.jpg?x-oss-process=image/resize,w_332/format,webp",
                    "goodsId": "goods055",
                    "shop_name": "GoBiggeR 便携式触屏显示器 ZB133TF-W ",
                    "shop_price": "1329",
                    "old_price": "1990"
                }
            ]
        },
    ];
    res.json({ code: 200, result });
})
//猜你喜欢接口
app.get("/likeList", (req, res) => {
    var result = [

        {
            "shop_name": "Smartisan 帆布鞋",
            "shop_price": "189",
            "old_price": "259",
            "shop_img": "https://resource.smartisan.com/resource/1c13034d1028f3620d487c1db7184a51.jpg?x-oss-process=image/resize,w_344/format,webp",
            "yh": "限时特价"
        },
        {
            "shop_name": "Smartisan Polo衫 经典款",
            "shop_price": "199",
            "old_price": "299",
            "shop_img": "https://resource.smartisan.com/resource/daa975651d6d700c0f886718c520ee19.jpg?x-oss-process=image/resize,w_344/format,webp",
            "yh": "限时特价"
        },
        {
            "shop_name": "Smartisan 半入耳式耳机",
            "shop_price": "39",
            "old_price": "59",
            "shop_img": "https://resource.smartisan.com/resource/30ac0a1ab02999667f1362c501447e58.jpg?x-oss-process=image/resize,w_344/format,webp",
            "yh": "限时特价"
        },
        {
            "shop_name": "坚果“电池形电池”移动电源",
            "shop_price": "29",
            "old_price": "69",
            "shop_img": "https://resource.smartisan.com/resource/33954b3f6a2f1614c5482ef130af9cc8.jpg?x-oss-process=image/resize,w_344/format,webp",
            "yh": "限时特价"
        },
        {
            "shop_name": "坚果 Type-C To Type-C 数据线",
            "shop_price": "36",
            "old_price": "99",
            "shop_img": "https://resource.smartisan.com/resource/8635cb91f2cdbbc5576e069c52b99412.jpg?x-oss-process=image/resize,w_344/format,webp",
            "yh": "限时特价"
        },
        {
            "shop_name": "smartisan砖式蓝牙小音箱",
            "shop_price": "99",
            "old_price": "199",
            "shop_img": "https://resource.smartisan.com/resource/6e96ccea3bd56bdd2243eb20330cec30.jpg?x-oss-process=image/resize,w_344/format,webp",
            "yh": "限时特价"
        }

    ];
    res.json({ code: 200, result });
})
// 通过id获取商品列表
app.get("/classifyList", (req, res) => {
    var result = [
        // 手机壳
        {
            id: "001",
            classifyList: [
                {
                    "shop_name": "坚果 Pro 3 smartisan 复古相机保护套",
                    "shop_price": "34.90",
                    "old_price": "49.00",
                    "shop_img": "https://resource.smartisan.com/resource/bd3372047d251502348a16a533e866e0.jpg",
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/db1f9c8eadd0164a34e73465a34776a3.jpg?x-oss-process=image/resize,w_332/format,webp",
                    "shop_name": "坚果 Pro 3 足迹保护套 德国天文学家开普勒出生",
                    "shop_price": "39",
                    "old_price": "69"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/b69694515f503e9c5be2a056314a569e.jpeg?x-oss-process=image/resize,w_332/format,webp",
                    "shop_name": "坚果 Pro 3 足迹保护套 数学家哈密顿首次发现四元数",
                    "shop_price": "39",
                    "old_price": "99"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/b93f8e0265cf372e774d0a76e32f2c0f.png?x-oss-process=image/resize,w_332/format,webp",
                    "shop_name": "坚果 Pro 3 足迹保护套 克里斯蒂安·多普勒出生",
                    "shop_price": "39",
                    "old_price": "49"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/b466c9c2f8948309a8d9e4a9d1a437ef.jpg",
                    "shop_name": "足迹保护套 克里斯蒂安·多普勒出生 for iPhone 11",
                    "shop_price": "55",
                    "old_price": "99"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/5888f9b53cd1184ac32f2ae778cd7804.jpg?x-oss-process=image/resize,w_332/format,webp",
                    "shop_name": "足迹保护套 莱卡成为第一只进入地球轨道的动物 for iPhone 11",
                    "shop_price": "55",
                    "old_price": "99"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/31c8be42fbbabad10490835d953be356.jpg?x-oss-process=image/resize,w_332/format,webp",
                    "shop_name": "坚果 Pro 3 足迹保护套 莫里斯·詹姆士·麦当劳出生",
                    "shop_price": "39",
                    "old_price": "99"
                }
            ]
        },
        // 线材
        {
            id: "002",
            classifyList: [
                {
                    "shop_img": "https://resource.smartisan.com/resource/e991f946530a7cfab3d9670dd8b1371b.png?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods032",
                    "shop_name": "Smartisan 真无线蓝牙耳机",
                    "shop_price": "199",
                    "old_price": "250"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/de1274f4c70fe3768417bb0454320089.png?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods033",
                    "shop_name": "坚果快充移动电源 20000mAh（45W MAX)",
                    "shop_price": "155",
                    "old_price": "199"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/6e96ccea3bd56bdd2243eb20330cec30.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods034",
                    "shop_name": "smartisan砖式蓝牙小音箱",
                    "shop_price": "99",
                    "old_price": "199"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/f6686f1babc3e18970082dcb21ff2a5e.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods035",
                    "shop_name": "坚果快充移动电源 10000mAh （18W max）",
                    "shop_price": "99",
                    "old_price": "199"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/834e8388b0017c457c98baa6545cdfb2.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods036",
                    "shop_name": "C-force  USB-C多功能转接器",
                    "shop_price": "148",
                    "old_price": "259"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/82aab62886740f165a3631ce6cffe895.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods037",
                    "shop_name": "坚果彩虹数据线",
                    "shop_price": "19",
                    "old_price": "39"
                }
            ]
        },
        // 音响
        {
            id: "003",
            classifyList: [
                {
                    "shop_img": "https://resource.smartisan.com/resource/69d56990440fd3b6ff5f4aa508c14867.jpg",
                    "shop_name": "ASPOR A663智能TWS蓝牙音箱",
                    "shop_price": "90",
                    "old_price": "103"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/6e96ccea3bd56bdd2243eb20330cec30.jpg",
                    "shop_name": "smartisan砖式蓝牙小音箱",
                    "shop_price": "99",
                    "old_price": "149"
                }
            ]
        },
        //车载充电器
        {
            id: "004",
            classifyList: [
                {
                    "shop_img": "https://resource.smartisan.com/resource/b287be97e7e002216b331452dd565fde.jpg",
                    "shop_name": "公牛扩展式车载充电器GNV—CD1181",
                    "shop_price": "90",
                    "old_price": "109"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/15323c26bf6b70d455e2c8da8564cdfc.jpg",
                    "shop_name": "公牛塑料车充CUB12H",
                    "shop_price": "36",
                    "old_price": "49"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/d31364cd9bc702f1027503fb7a9970d8.jpg",
                    "shop_name": "公牛红外感应车载无线充电器GNV-CA1100",
                    "shop_price": "159",
                    "old_price": "199"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/d4480234a2f24b0ff5acd98288fd902d.jpg",
                    "shop_name": "martisan 双口 & 快充车载充电器",
                    "shop_price": "36",
                    "old_price": "49"
                }
            ]
        },
        //车载支架
        {
            id: "005",
            classifyList: [
                {
                    "shop_img": "https://resource.smartisan.com/resource/c5e62667e692d0682cf5d3b1aa4626c7.jpg?x-oss-process=image/format,webp",
                    "shop_name": "抖音文创多功能车载手环手机支架",
                    "shop_price": "39",
                    "old_price": "53"
                },

            ]
        },
        // 车载香薰
        {
            id: "006",
            classifyList: [

                {
                    "shop_img": "https://resource.smartisan.com/resource/f4dc77cc05e0b99b47cb4bde33c53902.jpg?x-oss-process=image/format,webp",
                    "shop_name": "春量LIFE飞碟系列金属车载香薰",
                    "shop_price": "75",
                    "old_price": "99"
                }
            ]
        },
        // T恤 
        {
            id: "007",
            classifyList: [
                {
                    "shop_img": "https://resource.smartisan.com/resource/b901d1e4d1671d3b40ab06903efa8b5b.png?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods042",
                    "shop_name": "落栗 T恤 条形码首次商业使用",
                    "shop_price": "134",
                    "old_price": "399"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/c537876371d7443d6622ee8feeb12135.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods043",
                    "shop_name": "落栗 T恤 弗里德里希·福禄贝尔出生",
                    "shop_price": "134",
                    "old_price": "199"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/e639c6b9bd7fbf3ebc9fa1cde17e01ec.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods044",
                    "shop_name": "落栗 T恤 林徽因出生",
                    "shop_price": "134",
                    "old_price": "299"
                },

                {
                    "shop_img": "https://resource.smartisan.com/resource/f43da1331c769745d41286b0962a8d04.png?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods046",
                    "shop_name": "落栗 T恤 鲁迅出生",
                    "shop_price": "134",
                    "old_price": "199"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/a006279134054552b9d367eca783efd8.png?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods047",
                    "shop_name": "落栗 T恤 卡夫卡出生 ",
                    "shop_price": "134",
                    "old_price": "299"
                }
            ]
        },
        // 卫衣
        {
            id: "008",
            classifyList: [
                {
                    "shop_img": "https://resource.smartisan.com/resource/a02fca009d05edc657d7f749e891b6da.png",
                    "shop_name": "落栗 卫衣 连帽 莫里斯·麦当劳诞生",
                    "shop_price": "149",
                    "old_price": "249"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/a6197c586017f5fd1231e04a2554a063.png",
                    "shop_name": "落栗 卫衣 圆领 莫里斯·麦当劳诞生",
                    "shop_price": "149",
                    "old_price": "249"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/567f3ae5e5c244ad3088bc2550ef3091.png",
                    "shop_name": "落栗 卫衣 圆领 百年孤独",
                    "shop_price": "149",
                    "old_price": "249"
                },
            ]
        },
        // 帆布鞋
        {
            id: "009",
            classifyList: [
                {
                    "shop_img": "https://resource.smartisan.com/resource/1c13034d1028f3620d487c1db7184a51.jpg?x-oss-process=image/resize,w_220/format,webp",
                    "goodsId": "goods045",
                    "shop_name": "Smartisan 帆布鞋",
                    "shop_price": "149",
                    "old_price": "299"
                },
            ]
        },
        // 行李箱
        {
            id: "010",
            classifyList: [
                {
                    "shop_img": "https://resource.smartisan.com/resource/46bb2de2f6b6387484211f0cfc84dfd5.jpg",
                    "shop_name": "地平线箱包 限时大促",
                    "shop_price": "369",
                    "old_price": "399"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/9960e83a55544fbf7b046013a6f7f414.jpg",
                    "shop_name": "地平线 8 号 28 寸旅行箱",
                    "shop_price": "569",
                    "old_price": "599"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/d1dcca9144e8d13ffb33026148599d0a.png",
                    "shop_name": "地平线 8 号商务旅行箱",
                    "shop_price": "845",
                    "old_price": "999"
                },
            ]
        },
        // 宠物
        {
            id: "011",
            classifyList: [
                {
                    "shop_img": "https://resource.smartisan.com/resource/fb539f4433f6b7c3e078510a942add1c.png?x-oss-process=image/format,webp",
                    "shop_name": "时光云摩猫梳",
                    "shop_price": "35",
                    "old_price": "49"
                },
            ]
        },
        // 空气净化器
        {
            id: "012",
            classifyList: [
                {
                    "shop_img": "https://resource.smartisan.com/resource/6ff92d05a3bfab4fad489ca04d3eea5a.png?x-oss-process=image/format,webp",
                    "shop_name": "畅呼吸智能空气净化器·标准版",
                    "shop_price": "2059",
                    "old_price": "2799"
                },
            ]
        },

        // 显示屏
        {
            id: "013",
            classifyList: [
                {
                    "shop_img": "https://resource.smartisan.com/resource/f90eb5c8dd0b6221cfdc0b0c3bdd1b87.jpg?x-oss-process=image/resize,w_332/format,webp",
                    "goodsId": "goods052",
                    "shop_name": "GoBiggeR  便携式触屏显示器 ZB156TF",
                    "shop_price": "1519",
                    "old_price": "2000"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/2d5bac538fef9800aa5cd8420cfcdc12.jpg?x-oss-process=image/resize,w_332/format,webp",
                    "goodsId": "goods053",
                    "shop_name": "GoBiggeR 便携式触屏显示器 ZB133TF-W ",
                    "shop_price": "1329",
                    "old_price": "1999"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/84b472956d7facb9d7134f7569d3bd84.jpg?x-oss-process=image/resize,w_332/format,webp",
                    "goodsId": "goods054",
                    "shop_name": "GoBiggeR 便携式触屏显示器  ZB156UT",
                    "shop_price": "1879",
                    "old_price": "2500"
                },
                {
                    "shop_img": "https://resource.smartisan.com/resource/df8c296ccf8f78af57901d213c24d5a7.jpg?x-oss-process=image/resize,w_332/format,webp",
                    "goodsId": "goods055",
                    "shop_name": "GoBiggeR 便携式触屏显示器 ZB133TF-W ",
                    "shop_price": "1329",
                    "old_price": "1990"
                }
            ]
        },
    ];
    let data = result.find(item => item.id == req.query.id);
    res.json({ code: 200, result: data });
})
app.get("/classify", function (req, res) {
    var result = [
        // 手机数码
        [
            {
                className: "数码配件",
                goodsList: [
                    {
                        classId: "001",
                        name: "手机壳",
                        img: "https://resource.smartisan.com/resource/9368c948ea81a5b8bc2efa165488ccc6.jpg"
                    },
                    {
                        classId: "002",
                        name: "线材",
                        img: "https://resource.smartisan.com/resource/8e822aa7cbab24fec7eacf0bbb2f6526.jpg"
                    },
                ]
            },
            {
                className: "影音娱乐",
                goodsList: [
                    {
                        classId: "003",
                        name: "音箱 / 音响",
                        img: "https://resource.smartisan.com/resource/6e96ccea3bd56bdd2243eb20330cec30.jpg"
                    }
                ]
            },
        ],
        //汽车用品
        [
            {
                className: "车载电器",
                goodsList: [
                    {
                        classId: "004",
                        name: "车载充电器",
                        img: "https://resource.smartisan.com/resource/d4480234a2f24b0ff5acd98288fd902d.jpg"
                    }

                ]
            },
            {
                className: "汽车装饰",
                goodsList: [
                    {
                        classId: "005",
                        name: "车载支架",
                        img: "https://resource.smartisan.com/resource/c5e62667e692d0682cf5d3b1aa4626c7.jpg"
                    },
                    {
                        classId: "006",
                        name: "车载香薰",
                        img: "https://resource.smartisan.com/resource/f4dc77cc05e0b99b47cb4bde33c53902.jpg"
                    },
                ]
            },
        ],
        //鞋包服饰
        [
            {
                className: "服饰",
                goodsList: [
                    {
                        classId: "007",
                        name: "T恤",
                        img: "https://resource.smartisan.com/resource/80f86956e4498ef534e989e12aeb9bab.png"
                    },
                    {
                        classId: "008",
                        name: "卫衣",
                        img: "https://resource.smartisan.com/resource/bc50c28fff03c92035593887eb173d93.png",

                    },

                ]
            },
            {
                className: "鞋",
                goodsList: [
                    {
                        classId: "009",
                        name: "帆布鞋",
                        img: "https://resource.smartisan.com/resource/578116bddf1d170c89e9af7ba5073fb6.jpg"
                    }
                ]
            },
            {
                className: "箱包",
                goodsList: [
                    {
                        classId: "010",
                        name: "拉杆箱",
                        img: "https://resource.smartisan.com/resource/db4895e45ee6f3339037dbf7200e63f2.png"
                    }
                ]
            },
        ],
        //宠物生活
        [
            {
                className: "宠物用品",
                goodsList: [
                    {
                        classId: "011",
                        name: "洗护美容",
                        img: "https://resource.smartisan.com/resource/fb539f4433f6b7c3e078510a942add1c.png"
                    }
                ]
            },

        ],
        //家用电器
        [
            {
                className: "生活电器",
                goodsList: [
                    {
                        classId: "012",
                        name: "空气净化器",
                        img: "https://resource.smartisan.com/resource/6ff92d05a3bfab4fad489ca04d3eea5a.png"
                    }
                ]
            },

        ],
        //电脑办公
        [
            {
                className: "显示屏",
                goodsList: [
                    {
                        classId: "013",
                        name: "触屏显示屏",
                        img: "https://resource.smartisan.com/resource/84b472956d7facb9d7134f7569d3bd84.jpg"
                    }
                ]
            },

        ]
    ];
    res.json({ code: 200, result });
})
app.get("/searchData", (req, res) => {
    var result=[
        {
            "shop_img": "https://resource.smartisan.com/resource/fa6e26d738d64a3ecfdae3286e28aeb8.jpg?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods012",
            "shop_name": "APIYOO 皮卡丘声波儿童牙刷",
            "shop_price": "289",
            "old_price": "399"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/63cea2eeec303c66e62fbd94499868b9.jpg?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods013",
            "shop_name": "FERACE智能健康手表",
            "shop_price": "230",
            "old_price": "399"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/3e4bc67b30c200b7fe7baae8acf960bc.jpg?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods014",
            "shop_name": "smartisan  颈挂蓝牙耳机",
            "shop_price": "179",
            "old_price": "299"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/473b6b76cb3bc8bf6bfef8f7b85d97cb.jpg?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods015",
            "shop_name": "ASPOR 无线TWS耳机",
            "shop_price": "98",
            "old_price": "199"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/4a5ed736d31b820d2c04709717a59d54.jpg?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods016",
            "shop_name": "Remax便携式手持风扇",
            "shop_price": "35",
            "old_price": "99"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/a0a6a36bf42659c454d87e780f0973ce.jpg?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods017",
            "shop_name": "佳奥泰国原装进口乳胶枕",
            "shop_price": "230",
            "old_price": "399"

        },
        {
            "shop_img": "https://resource.smartisan.com/resource/d809ff308b29aa93aabceb49fe5db3e7.jpg?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods018",
            "shop_name": "SKG K5 颈椎按摩仪",
            "shop_price": "539",
            "old_price": "699"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/9064581e930dce1cb746aab03a99f250.jpg?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods019",
            "shop_name": "公牛塑料车充CUB12H",
            "shop_price": "39",
            "old_price": "99"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/a4c73e549097c7f5cf2c5e0d87e56d13.png?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods002",
            "shop_name": "坚果 Pro 3 s2",
            "shop_price": "3599",
            "old_price": "3999"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/f195e666e089d4e3775ce67d8e9523ce.png?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods003",
            "shop_name": "坚果 Pro 3 s1",
            "shop_price": "2399",
            "old_price": "2999"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/a5b6bf1f38fb88dceeb1e917bec288da.jpg?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods004",
            "shop_name": "smartisan  颈挂蓝牙耳机",
            "shop_price": "179",
            "old_price": "399"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/9934374dda26c292555dd1ec0887e17b.png?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods005",
            "shop_name": "坚果 Pro 3 x",
            "shop_price": "2699",
            "old_price": "2999"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/d159521e479b26f3c97a1e4f00a5aefd.jpg?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods006",
            "shop_name": "smartisan  颈挂蓝牙耳机",
            "shop_price": "179",
            "old_price": "299"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/8e822aa7cbab24fec7eacf0bbb2f6526.jpg?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods007",
            "shop_name": "坚果 弯头数据线（Type-C）",
            "shop_price": "24.9",
            "old_price": "29"
        },
        {
            "shop_name": "Smartisan Polo衫 经典款",
            "shop_price": "199",
            "old_price": "299",
            "shop_img": "https://resource.smartisan.com/resource/daa975651d6d700c0f886718c520ee19.jpg?x-oss-process=image/resize,w_344/format,webp",
            "yh": "限时特价"
        },
        {
            "shop_name": "Smartisan 半入耳式耳机",
            "shop_price": "39",
            "old_price": "59",
            "shop_img": "https://resource.smartisan.com/resource/30ac0a1ab02999667f1362c501447e58.jpg?x-oss-process=image/resize,w_344/format,webp",
            "yh": "限时特价"
        },
        {
            "shop_name": "坚果“电池形电池”移动电源",
            "shop_price": "29",
            "old_price": "69",
            "shop_img": "https://resource.smartisan.com/resource/33954b3f6a2f1614c5482ef130af9cc8.jpg?x-oss-process=image/resize,w_344/format,webp",
            "yh": "限时特价"
        },
        {
            "shop_name": "坚果 Type-C To Type-C 数据线",
            "shop_price": "36",
            "old_price": "99",
            "shop_img": "https://resource.smartisan.com/resource/8635cb91f2cdbbc5576e069c52b99412.jpg?x-oss-process=image/resize,w_344/format,webp",
            "yh": "限时特价"
        },
        {
            "shop_name": "smartisan砖式蓝牙小音箱",
            "shop_price": "99",
            "old_price": "199",
            "shop_img": "https://resource.smartisan.com/resource/6e96ccea3bd56bdd2243eb20330cec30.jpg?x-oss-process=image/resize,w_344/format,webp",
            "yh": "限时特价"
        },
        {
            "shop_name": "坚果 Pro 3 smartisan 复古相机保护套",
            "shop_price": "34.90",
            "old_price": "49.00",
            "shop_img": "https://resource.smartisan.com/resource/bd3372047d251502348a16a533e866e0.jpg",
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/db1f9c8eadd0164a34e73465a34776a3.jpg?x-oss-process=image/resize,w_332/format,webp",
            "shop_name": "坚果 Pro 3 足迹保护套 德国天文学家开普勒出生",
            "shop_price": "39",
            "old_price": "69"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/b69694515f503e9c5be2a056314a569e.jpeg?x-oss-process=image/resize,w_332/format,webp",
            "shop_name": "坚果 Pro 3 足迹保护套 数学家哈密顿首次发现四元数",
            "shop_price": "39",
            "old_price": "99"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/b93f8e0265cf372e774d0a76e32f2c0f.png?x-oss-process=image/resize,w_332/format,webp",
            "shop_name": "坚果 Pro 3 足迹保护套 克里斯蒂安·多普勒出生",
            "shop_price": "39",
            "old_price": "49"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/b466c9c2f8948309a8d9e4a9d1a437ef.jpg",
            "shop_name": "足迹保护套 克里斯蒂安·多普勒出生 for iPhone 11",
            "shop_price": "55",
            "old_price": "99"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/5888f9b53cd1184ac32f2ae778cd7804.jpg?x-oss-process=image/resize,w_332/format,webp",
            "shop_name": "足迹保护套 莱卡成为第一只进入地球轨道的动物 for iPhone 11",
            "shop_price": "55",
            "old_price": "99"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/31c8be42fbbabad10490835d953be356.jpg?x-oss-process=image/resize,w_332/format,webp",
            "shop_name": "坚果 Pro 3 足迹保护套 莫里斯·詹姆士·麦当劳出生",
            "shop_price": "39",
            "old_price": "99"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/e991f946530a7cfab3d9670dd8b1371b.png?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods032",
            "shop_name": "Smartisan 真无线蓝牙耳机",
            "shop_price": "199",
            "old_price": "250"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/de1274f4c70fe3768417bb0454320089.png?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods033",
            "shop_name": "坚果快充移动电源 20000mAh（45W MAX)",
            "shop_price": "155",
            "old_price": "199"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/6e96ccea3bd56bdd2243eb20330cec30.jpg?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods034",
            "shop_name": "smartisan砖式蓝牙小音箱",
            "shop_price": "99",
            "old_price": "199"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/f6686f1babc3e18970082dcb21ff2a5e.jpg?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods035",
            "shop_name": "坚果快充移动电源 10000mAh （18W max）",
            "shop_price": "99",
            "old_price": "199"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/834e8388b0017c457c98baa6545cdfb2.jpg?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods036",
            "shop_name": "C-force  USB-C多功能转接器",
            "shop_price": "148",
            "old_price": "259"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/82aab62886740f165a3631ce6cffe895.jpg?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods037",
            "shop_name": "坚果彩虹数据线",
            "shop_price": "19",
            "old_price": "39"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/69d56990440fd3b6ff5f4aa508c14867.jpg",
            "shop_name": "ASPOR A663智能TWS蓝牙音箱",
            "shop_price": "90",
            "old_price": "103"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/6e96ccea3bd56bdd2243eb20330cec30.jpg",
            "shop_name": "smartisan砖式蓝牙小音箱",
            "shop_price": "99",
            "old_price": "149"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/b287be97e7e002216b331452dd565fde.jpg",
            "shop_name": "公牛扩展式车载充电器GNV—CD1181",
            "shop_price": "90",
            "old_price": "109"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/15323c26bf6b70d455e2c8da8564cdfc.jpg",
            "shop_name": "公牛塑料车充CUB12H",
            "shop_price": "36",
            "old_price": "49"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/d31364cd9bc702f1027503fb7a9970d8.jpg",
            "shop_name": "公牛红外感应车载无线充电器GNV-CA1100",
            "shop_price": "159",
            "old_price": "199"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/d4480234a2f24b0ff5acd98288fd902d.jpg",
            "shop_name": "martisan 双口 & 快充车载充电器",
            "shop_price": "36",
            "old_price": "49"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/c5e62667e692d0682cf5d3b1aa4626c7.jpg?x-oss-process=image/format,webp",
            "shop_name": "抖音文创多功能车载手环手机支架",
            "shop_price": "39",
            "old_price": "53"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/f4dc77cc05e0b99b47cb4bde33c53902.jpg?x-oss-process=image/format,webp",
            "shop_name": "春量LIFE飞碟系列金属车载香薰",
            "shop_price": "75",
            "old_price": "99"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/b901d1e4d1671d3b40ab06903efa8b5b.png?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods042",
            "shop_name": "落栗 T恤 条形码首次商业使用",
            "shop_price": "134",
            "old_price": "399"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/c537876371d7443d6622ee8feeb12135.jpg?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods043",
            "shop_name": "落栗 T恤 弗里德里希·福禄贝尔出生",
            "shop_price": "134",
            "old_price": "199"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/e639c6b9bd7fbf3ebc9fa1cde17e01ec.jpg?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods044",
            "shop_name": "落栗 T恤 林徽因出生",
            "shop_price": "134",
            "old_price": "299"
        },

        {
            "shop_img": "https://resource.smartisan.com/resource/f43da1331c769745d41286b0962a8d04.png?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods046",
            "shop_name": "落栗 T恤 鲁迅出生",
            "shop_price": "134",
            "old_price": "199"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/a006279134054552b9d367eca783efd8.png?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods047",
            "shop_name": "落栗 T恤 卡夫卡出生 ",
            "shop_price": "134",
            "old_price": "299"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/a02fca009d05edc657d7f749e891b6da.png",
            "shop_name": "落栗 卫衣 连帽 莫里斯·麦当劳诞生",
            "shop_price": "149",
            "old_price": "249"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/a6197c586017f5fd1231e04a2554a063.png",
            "shop_name": "落栗 卫衣 圆领 莫里斯·麦当劳诞生",
            "shop_price": "149",
            "old_price": "249"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/567f3ae5e5c244ad3088bc2550ef3091.png",
            "shop_name": "落栗 卫衣 圆领 百年孤独",
            "shop_price": "149",
            "old_price": "249"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/1c13034d1028f3620d487c1db7184a51.jpg?x-oss-process=image/resize,w_220/format,webp",
            "goodsId": "goods045",
            "shop_name": "Smartisan 帆布鞋",
            "shop_price": "149",
            "old_price": "299"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/46bb2de2f6b6387484211f0cfc84dfd5.jpg",
            "shop_name": "地平线箱包 限时大促",
            "shop_price": "369",
            "old_price": "399"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/9960e83a55544fbf7b046013a6f7f414.jpg",
            "shop_name": "地平线 8 号 28 寸旅行箱",
            "shop_price": "569",
            "old_price": "599"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/d1dcca9144e8d13ffb33026148599d0a.png",
            "shop_name": "地平线 8 号商务旅行箱",
            "shop_price": "845",
            "old_price": "999"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/fb539f4433f6b7c3e078510a942add1c.png?x-oss-process=image/format,webp",
            "shop_name": "时光云摩猫梳",
            "shop_price": "35",
            "old_price": "49"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/6ff92d05a3bfab4fad489ca04d3eea5a.png?x-oss-process=image/format,webp",
            "shop_name": "畅呼吸智能空气净化器·标准版",
            "shop_price": "2059",
            "old_price": "2799"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/f90eb5c8dd0b6221cfdc0b0c3bdd1b87.jpg?x-oss-process=image/resize,w_332/format,webp",
            "goodsId": "goods052",
            "shop_name": "GoBiggeR  便携式触屏显示器 ZB156TF",
            "shop_price": "1519",
            "old_price": "2000"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/2d5bac538fef9800aa5cd8420cfcdc12.jpg?x-oss-process=image/resize,w_332/format,webp",
            "goodsId": "goods053",
            "shop_name": "GoBiggeR 便携式触屏显示器 ZB133TF-W ",
            "shop_price": "1329",
            "old_price": "1999"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/84b472956d7facb9d7134f7569d3bd84.jpg?x-oss-process=image/resize,w_332/format,webp",
            "goodsId": "goods054",
            "shop_name": "GoBiggeR 便携式触屏显示器  ZB156UT",
            "shop_price": "1879",
            "old_price": "2500"
        },
        {
            "shop_img": "https://resource.smartisan.com/resource/df8c296ccf8f78af57901d213c24d5a7.jpg?x-oss-process=image/resize,w_332/format,webp",
            "goodsId": "goods055",
            "shop_name": "GoBiggeR 便携式触屏显示器 ZB133TF-W ",
            "shop_price": "1329",
            "old_price": "1990"
        }

    ]
       res.json({ code: 200, result });
})
// 搜索数据
app.listen(3000, "127.0.0.1", () => {
    console.log("请求到 http://127.0.0.1:3000");

})