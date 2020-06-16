export default{
    namespaced:true,//命名空间
    state:{
        lists:[],
        typeList:["全部订单","待支付","待收货","已完成"]
    },
    mutations: {
        add(state,obj){
            state.lists.push(obj);
        },
        edit(state,obj){
            state.lists = null; //原本数据清空
            state.lists = obj; //修改
        },
          // 通过id单独修改数据
          editId(state,obj){
            for(let i = 0;i < obj.length;i++){
                for(let j = 0;j < state.lists.length;j++){
                    // 状态值为6删除数据
                    if(obj[i].orderId == state.lists[j].orderId && obj[i].type == 6){
                        state.lists.splice(j,1);

                        // 修改数据id等于当前vuex数据id
                    }else if(obj[i].orderId == state.lists[j].orderId){
                        state.lists[j].type = obj[i].type;
                    }
                }
            }
            
        }
    },
    actions: {},
    getters:{},
    modules: {}
}