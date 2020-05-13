<template>
  <div class="home-box">
    <div class="home-header">
      <div class="home-header-min-box af">
        <div class="home-header-left fl">
          <div class="header-left fl">
            <img src="../../assets/images/home/home-logo.png" alt="">
          </div>
          <div class="header-right fr">城市轨道交通智慧工地管理系统</div>
        </div>
        <div class="home-header-right fr">
          <div class="out fl">
            <div class="fl" style="margin-right:10px;">
              <img src="../../assets/images/home/home-out.png" alt="">
            </div>
            <div class="fl">
            <el-link :underline="false" class="out-text" @click.native="logout">退出登录</el-link>
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
    <div class="home-main">
      <div class="home-mian-box">
        <div class="home-mian-t af">
          <el-row>
            <el-col :span="6">
              <div class="home-list home-personnel">
                <img src="../../assets/images/home/home-personnel.png" alt="">
                <div class="home-list-text">
                  <ul class="af">
                    <li>实名认证</li>
                    <li>智慧考勤</li>
                    <li>培训教育</li>
                    
                  </ul>
                  <ul class="af">
                    <li>诚信管理</li>
                    <li>人员定位</li>
                  </ul>
                </div>
                <el-button
                  type="primary"
                  round
                  icon="el-icon-view"
                  @click="adminPage"
                >人员智慧管理</el-button>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="home-list home-mechanics">
                <img src="../../assets/images/home/hme-mechanics.png" alt="">
                <div class="home-list-text">
                  <ul class="af">
                    <li>实名认证</li>
                    <li>班组管理</li>
                    <li>花名册</li>  
                  </ul>
                  <ul class="af">
                    <li>外来人员</li>
                  </ul>
                </div>
                <el-button type="primary" round icon="el-icon-view">机械设备管理</el-button>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="home-list home-video">
                <img src="../../assets/images/home/home-video.png" alt="">
                <div class="home-list-text">
                  <ul class="af">
                    <li>实名认证</li>
                    <li>班组管理</li>
                    <li>花名册</li>
                  </ul>
                  <ul class="af">
                    <li>外来人员</li>
                  </ul>
                </div>
                <el-button type="primary" round icon="el-icon-view">视频监控管理</el-button>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="home-list home-ambient">
                <img src="../../assets/images/home/home-ambient.png" alt="">
                <div class="home-list-text">
                  <ul class="af">
                    <li>实名认证</li>
                    <li>班组管理</li>
                    <li>花名册</li>  
                  </ul>
                  <ul class="af">
                    <li>外来人员</li>
                  </ul>
                </div>
                <el-button type="primary" round icon="el-icon-view">环境能耗管理</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="home-mian-b af">
          <el-row>
            <el-col :span="6" :offset="3" style="width: 420px;">
              <div class="home-list home-list-lg home-materiel-sm">
                <img src="../../assets/images/home/home-materiel-sm.png" alt="">
                <img src="../../assets/images/home/home-materiel-lg.png" alt="" class="materiel-lg">
                <div class="home-list-text">
                  <ul class="af">
                    <li>实名认证</li>
                    <li>班组管理</li>
                    <li>花名册</li>  
                  </ul>
                  <ul class="af">
                    <li>外来人员</li>
                  </ul>
                </div>
                <el-button type="primary" round icon="el-icon-view">物料智慧管理</el-button>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="home-list home-progress">
                <img src="../../assets/images/home/home-progress.png" alt="">
                <div class="home-list-text">
                  <ul class="af">
                    <li>实名认证</li>
                    <li>班组管理</li>
                    <li>花名册</li>  
                  </ul>
                  <ul class="af">
                    <li>外来人员</li>
                  </ul>
                </div>
                <el-button type="primary" round icon="el-icon-view">进度智慧管理</el-button>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="home-list home-quality">
                <img src="../../assets/images/home/home-quality.png" alt="">
                <div class="home-list-text">
                  <ul class="af">
                    <li>实名认证</li>
                    <li>班组管理</li>
                    <li>花名册</li>  
                  </ul>
                  <ul class="af">
                    <li>外来人员</li>
                  </ul>
                </div>
                <el-button type="primary" round icon="el-icon-view">质量安全管理</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
/* eslint-disable*/
export default {
  data() {
    return {
      // 粒子开关
    };
  },
  created() {
    // 初始化时读取localStorage用户信息
    let username = window.localStorage.getItem('username');
  },
  computed: {
    ...mapGetters(["name", "avatar"])
  },
  methods: {
    ...mapActions({
      userLogout: "logout"
    }),
    adminPage () {
      this.$router.push({ path: "/home" })
    },
    logout() {
     
      // this.userLogout()
      //   .then(() => {
      //     location.reload(); // 为了重新实例化vue-router对象 避免bug// 为了重新实例化vue-router对象 避免bug
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      this.$router.push({ path: "/login" })
    }
  },
  watch: {},
  mounted() {}
};
</script>
<style lang="stylus" scoped>
.home-box {
  width 100%;
  height 100%;
}
ul,li {
  margin: 0;
  padding: 0;
  list-style:none;
}
.home-box {
  position absolute;
  min-width 1280px;
  min-height : 590px;
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
  padding-top: 10px;
}
.header-left img{
  width: 50px;
  height: 50px;
}
.header-right{
  width:342px;
  height:31px;
  font-size:24px;
  font-family:Microsoft YaHei;
  font-weight:bold;
  line-height:50px;
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
  position relative;
}
.home-mian-box{
  width 1280px;
  height 520px;
  position absolute;
  top 50%;
  left 50%;
  margin-left -640px;
  margin-top :-260px;
}
.home-list{
  width : 320px;
  height : 260px;
  position relative;
}
.home-list-lg{
  width : 420px;
  height : 260px;
}
.home-personnel{
  background-image : url('../../assets/images/home/home-personnel-bg.png');
}
.home-mechanics{
  background-image : url('../../assets/images/home/home-mechanics-bg.png');
}
.home-video{
  background-image : url('../../assets/images/home/home-video-bg.png');
}
.home-ambient{
  background-image : url('../../assets/images/home/home-ambient-bg.png');
}
.home-materiel-sm{
  background:rgba(255,255,255,1);
}
.home-progress{
  background-image : url('../../assets/images/home/home-progress-bg.png');
}
.home-quality{
  background-image : url('../../assets/images/home/home-quality-bg.png');
} 
.home-list-text{
  font-size:16px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
  padding : 30px 0 0 30px;
}
// 
.home-list-text li{
  float : left;
  margin : 2px 6px;
}
.home-list-lg .home-list-text li{
  color: #0058A2;
}
.home-list img{
  width : 65px;
  height : 65px;
  position : absolute;
  top : 98px;
  right : 49px;
}
.home-list img.materiel-lg{
  width : 100%;
  height : 100%;
  top : 30px;
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
