export default[
  {
    path: "/personal",
    name:"个人中心",
    component: () => import('../views/personal.vue')
  },
  {
    path: "/address",
    name:"我的地址",
    component: () => import('../components/personal/address.vue')
  },
  {
    path: "/addressAdd",
    name:"添加地址",
    component: () => import('../components/personal/addressAdd.vue')
  },
  {
    path: "/addressEdit",
    name:"编辑地址",
    component: () => import('../components/personal/addressEdit.vue')
  },
  {
    path:"/login", 
    name:"登陆",
    component:()=>import("../components/personal/login.vue")
},
{
    path:"/register",
    name:"注册",
    component:()=>import("../components/personal/register.vue")
},
{
    path:"/collect",
    name:"收藏",
    component:()=>import("../components/personal/collect.vue")
},
{
    path:"/coupon",
    name:"优惠劵",
    component:()=>import("../components/personal/coupon.vue")
},
{
    path:"/faq",
    name:"常见问题",
    component:()=>import("../components/personal/faq.vue")
},
]