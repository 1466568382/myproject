export default{
    namespaced:true,
    state:{
      lists:[],
      num:0,
    },
    mutations:{
        add(state,obj){
            let index=state.lists.findIndex(val=>val.shop_name==obj.shop_name); //判断是否存在数据如果不存在返回-1 找到就返回对应的下标
            if(index!="-1"){//找到相同  不相同返回-1 想同就返回!-1
                // console.log(state.lists[index]);
                state.lists[index].num+=1;
                state.num+=1;
                // state.num=state.lists[index].num;//和上面的功能一样

            }else{
                obj.isSelect=true;
                state.lists.push(obj);
                console.log(state.lists);
                state.num+=1;//如果不相同就等于1
            }
        }
    },
    actions:{},
    getters:{},
    modules:{}
  }