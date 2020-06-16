export default{
    namespaced:true,
    state:{
      lists:[
      ],
    },
    mutations:{
      del(state,index){
        state.lists.splice(index,1);
      },
      add(state,obj){
       let isHave= state.lists.findIndex(item=>item.shop_name==obj.shop_name);
       if(isHave=="-1"){
         state.lists.push(obj);
       }
      }
    },
    actions:{},
    getters:{},
    modules:{}
}