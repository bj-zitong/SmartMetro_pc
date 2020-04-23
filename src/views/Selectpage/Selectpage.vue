<template>
  <div class="home-box">
    <div class="home-header">
      <div class="home-header-min-box af">
        <div class="home-header-left fl">
          <div class="header-left fl">
            <img src="../../assets/images/home/home-logo.png" alt="">
          </div>
          <div class="header-right fr">智慧地铁管理系统</div>
        </div>
        <div class="home-header-right fr">
          <div class="out fl">
            <div class="fl" style="margin-right:10px;">
              <img src="../../assets/images/home/home-out.png" alt="">
            </div>
            <div class="fl">
              <a href="javascript:;" class="out-text">退出登录</a>
            </div>
          </div>
          <div class="interval fl"></div>
          <div class="name fl">
            <div class="fl">
              <a href="javascript:;">
                <img src="../../assets/images/home/home-head.png" alt="">
              </a>
            </div>
            <p href="javascript:;" class="name-text fr">用户名</p>
          </div>
        </div>
      </div>
    </div>
    <div class="home-main">main</div>
  </div>
</template>
<script>
/* eslint-disable*/
export default {
  data() {
    return {
      // 粒子开关
    };
  },
  created() {
    // 初始化时读取localStorage用户信息
  },
  methods: {},
  watch: {},
  mounted() {}
};
</script>
<style lang="stylus">
html, body, #app, .home-box {
  width 100%;
  height 100%;
}
.home-box {
  position relative;
}
/* 头部样式 */
.home-header {
  position relative;
  height 70px;
}
.home-header-min-box{
  position relative;
  padding 0 50px;
  height 100%;
}
.home-header-left{
  height 100%;
  box-sizing border-box;
  padding-top 20px;
}
.header-right{
  width:195px;
  height:31px;
  font-family:Microsoft YaHei;
  font-weight:bold;
  margin-left 20px;
  line-height:31px;
  color:rgba(0,88,162,1);
  opacity:1;
}
.home-header-right{
  height 100%;
  box-sizing border-box;
  padding-top 20px;
}
.interval{
  width:0px;
  height:20px;
  border:1px solid rgba(18,85,153,1);
  margin 5px 10px 0 5px;
  opacity:1;
}
.out{
  margin-right 10px;
  padding-top 6px;
}
.out-text{
  width:65px;
  height:21px;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(0,88,162,1);
  opacity:1;
}
.name-text{
  width:60px;
  height:21px;
  margin-left 10px;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:31px;
  color:rgba(0,88,162,1);
  opacity:1;
}
/* 主体样式 */
.home-main {
  width 100%;
  height calc(100% - 70px);
  background radial-gradient(circle,rgba(151,207,255,1) 0%,rgba(0,88,162,1) 100%);
  opacity 0.9;
}

.Container{
  min-width 1280px;
  margin 0 auto;
}
.af:after{
  content '';
  display block;
  clear both;
}
.fl{
  float left
}
.fr{
  float right;
}
</style>
