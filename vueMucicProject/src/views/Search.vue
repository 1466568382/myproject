<template>
  <div>
    <HomeLink></HomeLink>
    <!-- 搜索框 -->

    <div class="header" style="margin-top:40px">
      <div class="searchContent">
        <div class="searchBox">
          <i class="icon_search"></i>
          <input
            class="search"
            v-model="keyword"
            type="text"
            placeholder="搜索歌曲、歌手、专辑"
            @keyup.enter="clickSearch"
          />
          <i v-if="keyword" class="icon_del" @click="keyword=''"></i>
        </div>
      </div>
      <div class="title" v-show="searchWordShow" v-if="keyword">搜索“{{keyword}}”</div>
    </div>
    <!-- 热门搜索 -->
    <div class="hotSearch" v-if="searchHot">
      <div class="hotTitle">热门搜索</div>
      <div
        class="hotItem"
        v-for="(item, index) in hotSearchList"
        @click="searchSong(item.first)"
        :key="index"
      >{{item.first}}</div>
    </div>
    <!-- 搜索历史 -->
    <div class="searchHistory" v-if="searchHot">
      <div class="itemHistory" v-for="(item, index) in searchHistory" :key="index" @click="searchSong(item)">
        <i class="historyIcon"></i>
        <div class="text">{{item}}</div>
        <i class="delHistory" @click.stop="delHistory(index)"></i>
      </div>
    </div>
    <!-- 建议搜索 -->
    <ul class="suggest" v-show="searchWordShow" v-if="keyword">
      <li
        class="item"
        v-for="(item, index) in suggestList"
        :key="index"
        @click="searchSong(item.keyword)"
      >
        <i class="icon_suggest"></i>
        <span>{{item.keyword}}</span>
      </li>
    </ul>
    <!-- 搜索内容 -->
    <div class="searchContent" v-if="searchContentShow">
      <SongSearch
        v-for="(item, index) in searchSongList"
        :key="index"
        :songItem="item"
        :options="{info:true}"
        @tanslate-song="$emit('tanslate-song',$event)"
        :currentSong="currentSong"
      ></SongSearch>
      <!-- 搜索的加载遮罩层 -->
      <div class="loading" v-if="showLoading">
        <img src="../assets/loading.svg" alt />
      </div>
      <!--热门搜索加载遮罩层-->
    </div>
    <div class="loading" v-if="hotShowLoading">
      <img src="../assets/loading.svg" alt />
    </div>
  </div>
</template>

<script>
import HomeLink from "@/components/HomeLink";
import SongSearch from "@/components/SongSearch";
export default {
  props: {
    currentSong: Object
  },
  components: {
    HomeLink,
    SongSearch
  },
  data() {
    return {
      keyword: "",
      suggestList: [],
      searchSongList: [],
      hotSearchList: [],
      searchWordShow: true,
      searchContentShow: false,
      searchHot: true,
      showLoading: false,
      hotShowLoading: true,
      searchHistory: []
    };
  },
  methods: {
    delHistory(id){
      this.searchHistory.splice(id,1);
    },
    // 点击搜索
    clickSearch() {
      this.searchSong(this.keyword);
    },
    // 建议搜索
    getSuggest() {
      this.axios
        .get("/search/suggest", {
          params: {
            keywords: this.keyword,
            type: "mobile"
          }
        })
        .then(response => {
          this.suggestList = response.data.result.allMatch;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getHotList() {
      this.axios
        .get("/search/hot")
        .then(response => {
          this.hotSearchList = response.data.result.hots;
          this.hotShowLoading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    searchSong(word) {
    let isPush=this.searchHistory.includes(word);
    if(!isPush){
      this.searchHistory.push(word);
    }
      this.searchContentShow = true;
      this.searchWordShow = false;
      this.searchHot = false;
      this.keyword = word;
      this.showLoading = true;
      this.axios
        .get("/search", {
          params: {
            keywords: word
          }
        })
        .then(response => {
          this.showLoading = false;
          this.searchSongList = response.data.result.songs;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  watch: {
    keyword: function(v) {
      if (v) {
        //判断为空不执行
        this.searchHot = false;
        this.getSuggest();
      }
      if (v == "") {
        this.searchContentShow = false;
        this.searchWordShow = true;
        this.searchHot = true;
      }
    }
  },
  created() {
    this.getHotList();
  }
};
</script>

<style lang="less" scoped>
.header {
  border-bottom: 1px solid #f1f2f3;
}
.searchContent {
  padding: 15px;
  .searchBox {
    position: relative;
    width: 100%;
    height: 30px;
    padding: 0 30px;
    box-sizing: border-box;
    background: #ebecec;
    border-radius: 30px;
    .icon_search {
      position: absolute;
      left: 0;
      top: 9px;
      margin: 0 8px;
      vertical-align: middle;
      width: 13px;
      height: 13px;
      background: url("../assets/search.svg");
    }
    .icon_del {
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -7px;
      line-height: 28px;
      text-align: center;
      width: 14px;
      height: 14px;
      vertical-align: middle;
      background: url("../assets/del.svg");
    }
    .search {
      width: 100%;
      height: 30px;
      line-height: 18px;
      background: rgba(0, 0, 0, 0);
      font-size: 12px;
      color: #333;
      border: none;
      outline: none;
    }
    .search::-webkit-input-placeholder {
      color: #ccc;
    }
  }
}
.title {
  height: 50px;
  margin-left: 10px;
  padding-right: 10px;
  font-size: 15px;
  line-height: 50px;
  color: #507daf;
}

.suggest {
  .item {
    display: flex;
    align-items: center;
    height: 45px;
    padding-left: 10px;
    border-bottom: 1px solid #f1f2f3;
    .icon_suggest {
      flex: 0 0 auto;
      background-color: black;
      margin-right: 7px;
      width: 15px;
      height: 15px;
      background: url("../assets/search.svg");
    }
    span {
      flex: 1;
      width: 1%;
      padding-right: 10px;
      font-size: 15px;
      line-height: 45px;
      color: #333;
    }
  }
}

// 热门搜索
.hotSearch {
  padding: 15px 10px 0;
  .hotTitle {
    font-size: 12px;
    line-height: 12px;
    color: #666;
    margin-bottom: 10px;
  }
  .hotItem {
    display: inline-block;
    height: 32px;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 0 14px;
    font-size: 14px;
    line-height: 32px;
    color: #333;
    border: 1px solid #eeeff1;
    border-radius: 16px;
  }
}

.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; //就是看到的百分百 不能滑动页面
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  z-index: 999;
  justify-content: center; //主轴居中
  align-items: center; //交叉轴居中
  img {
    width: 50px;
  }
}
.searchHistory {
  margin-top: 20px;
  .itemHistory {
    display: flex;
    align-items: center;
    height: 45px;
    border-bottom: 1px solid #eeeff0;
    .historyIcon {
      width: 15px;
      height: 15px;
      margin: 0 10px;
      background: url("../assets/history.svg");
    }
    .text {
      flex: 1;
      width: 1%;
    }
    .delHistory {
       width: 15px;
      height: 15px;
      margin-right: 15px;
      background: url("../assets/delHistory.svg");
    }
  }
}
</style>
