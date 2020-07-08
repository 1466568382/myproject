const url="https://api.kele8.cn/agent/http://api.zhuishushenqi.com"
const getData=(path)=>fetch(url+path).then(res=>res.json())

//获取男女推荐
export const INDEX_FICTION=function(type="54d43437d47d13ff21cad58b"){
    return getData('/ranking/'+type)
}

// 获取页面详情
export const DETAIL_FICTION=function(id="5bc06d0bf7634e0d9cb4b31b"){
    return getData('/book/'+id)
}
//推荐视频
export const RECOMMEND_FICTION=function(id="5618f3496a767fd32686a650"){
    return getData('/book/'+id+'/recommend')
}

//分类
export const CLASSIFY_FICTION=function(){
    return getData('/cats/lv2/statistics')
}
//分类详情 category
export const CATEGORY_FICTION=function(type="奇幻",sex="male"){
    return getData(`/book/by-categories?gender=${sex}&type=hot&major=${type}&minor=&start=0&limit=20`)
}
//热门搜索 category
export const HOT_SEARCH=function(){
    return getData("/book/search-hotwords")
}
//热门搜索 category
export const HOT_WORDS=function(val){
    return getData(`/book/auto-complete?query=${val}`)
}

// 搜索
export const SEARCH_DATA=function(val="真"){
    return getData(`/book/fuzzy-search?query=${val}`)
}