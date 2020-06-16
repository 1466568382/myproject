export default [
  {
    path: "/shop",
    name:"购物车",
    component: () => import('../views/shop.vue')
  },
  {
    path: "/order",
    name:"订单",
    component: () => import('../components/shop/order.vue')
  },
]