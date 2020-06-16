export default[
    {
        path:"/guidance",
        name:"引导页",
        component:()=>import("../components/public/guidance")
    },
    {
        path:"/advertising",
        name:"引导页",
        component:()=>import("../components/public/advertising"),
        //进入之前
        beforeEnter: (to, from, next) => {
            if(localStorage.advertising){
                //如果有存储就直接跳到活动页  就是下一个页面
                next();
            }else{
                //没有参数就进入引导页
                localStorage.advertising=true;
                next("/guidance");
            }
        }
    },
  
]

