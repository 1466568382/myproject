export default{
    namespaced:true,//命名空间  这个用module必须要设置的
    state:{
      lists:[
        {
           
            name: "张三",
            tel: "13000000000",
            province: "山西省",
            city: "晋中市",
            county: "和顺县",
            addressDetail: "1231231",
            address: "山西省晋中市和顺县1231231",
            areaCode: "140723",
            isDefault: true,
            id: 1,
           
          },
      ],
      defaultId:1,//默认选项id
    },
    mutations:{
      add(state,obj){
        //去除默认选项
        state.lists.forEach(item=>{
            item.isDefault=false;
        })
        //处理id
        obj.isDefault=true;
        obj.id=state.lists.length+1;
        state.lists.push(obj);
      },
      edit(state,{id,...obj}){
          obj.id=state.lists.length;//id等于lists的长度
          state.lists[id]=obj;
      }
    },
    actions:{},
    getters:{},
    modules:{}
}