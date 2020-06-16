export default {
    path: "/indentList",
    name: "订单列表",
    component: () => import("../views/indentList.vue"),
    children: [
        {
            path: "indentAll",
            name: "全部订单",
            component: () => import("../components/indentList/indentAll.vue")
        },
        {
            path: "indentPay",
            name: "未支付",
            component: () => import("../components/indentList/indentPay.vue")
        },
        {
            path: "indentGoods",
            name: "待收货",
            component: () => import("../components/indentList/indentGoods.vue")
        },
        {
            path: "indentEnd",
            name: "已完成",
            component: () => import("../components/indentList/indentEnd.vue")
        },
    ]
}