<template>
  <div>
    <!-- 猜你喜欢  -->
    <div class="like">
      <h1>猜你喜欢</h1>
      <div class="content">
        <ul>
          <li v-for="(item, index) in goodsList" :key="index" @click="goDetail(item)">
            <div class="img">
              <img v-lazy="item.shop_img" alt />
            </div>
            <div class="text">
              <h2>{{item.shop_name}}</h2>
              <p>
                <span class="red">
                  <span class="rmb">￥</span>
                  {{item.shop_price}}
                </span>
                <del>￥{{item.old_price}}</del>
                <span class="yh">{{item.yh}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: []
    };
  },
  inject:['reload'],
  methods: {
    goDetail(data) {
      this.$router.push({ path: "./detail", query: data });
      this.reload();
    }
  },
  created() {
    var likeList = JSON.parse(window.localStorage.getItem("likeList"));
    if (likeList && likeList.expires > Date.now()) {
      this.goodsList = likeList.data;
    } else {
      this.$axios
        .get("likeList")
        .then(result => {
          if (result.data.code == 200) {
            window.localStorage.setItem(
              "likeList",
              JSON.stringify({
                expires: Date.now() + 10 * 60 * 1000,
                data: result.data.result
              })
            );
            this.goodsList = result.data.result;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
//猜你喜欢
.like {
  overflow: hidden;
  padding: 0 0.359375rem;
  background-color: #fff;
  h1 {
    color: #333333;
    height: 1.25rem;
    line-height: 1.25rem;
    font-size: 0.46875rem;
    text-indent: 0.25rem;
    display: flex;
  }
  ul {
    background-color: #fff;
    li {
      background-color: #fff;
      float: left;
      width: 49%;
      margin-right: 2%;
      &:nth-child(2n) {
        margin-right: 0;
      }
      .img {
        width: 100%;
        height: 4.6875rem;
        display: block;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.05);
        background-color: #fcfcfc;
        box-shadow: 0 0.02rem 0.2rem rgba(0, 0, 0, 0.06);
        border-radius: 0.234375rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text {
        background-color: #fff;
        padding: 0 0.15625rem;
        h2 {
          color: #4c4c4c;
          font-size: 0.375rem;
          height: 0.78125rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          line-height: 0.78125rem;
        }
        p {
          height:.9375rem;
          line-height: .3125rem;
          // margin-bottom: 0.15625rem;
          position: relative;
          .red {
            font-size: 0.375rem;
            color: #d44d44;
            .rmb {
              font-size: 0.28125rem;
            }
          }
          del {
            font-size: 0.213333rem;
            color: #c2c2c2;
          }
          .yh {
            position: absolute;
            top: 45%;
            transform: translateY(-50%);
            right: 0;
            padding: 0 0.234375rem;
            height: 0.46875rem;
            line-height: 0.46875rem;
            background-color: #f6ebea;
            color: #d56159;
            font-size: 0.3125rem;
            font-weight: bold;
            border-radius: 0.234375rem;
            float: right;
          }
        }
      }
    }
  }
}
</style>