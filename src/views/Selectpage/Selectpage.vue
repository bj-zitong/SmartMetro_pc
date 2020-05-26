<template>
  <div class="home-box">
    <div class="home-header">
      <div class="home-header-min-box af">
        <div class="home-header-left fl">
          <div class="header-left fl">
            <img src="../../assets/images/home/home-logo.png" alt />
          </div>
          <div class="header-right fr">城市轨道交通智慧工地管理系统</div>
        </div>
        <div class="home-header-right fr">
          <div class="out fl">
            <el-link :underline="false" class="out-text">{{orgSite}}</el-link>
            <el-divider direction="vertical" class="borderline"></el-divider>
          </div>
          <!-- <div class="interval fl"></div> -->
          <div class="name fl">
            <div class="fl">
              <a href="javascript:;">
                <img src="../../assets/images/home/home-head.png" alt class="loginimg" />
              </a>
            </div>
            <p href="javascript:;" class="name-text fr">{{username}}</p>
          </div>
          <el-dropdown trigger="click" style="margin-top:4px">
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
              <el-dropdown-item @click.native="logout">
                <span style="display:block;">{{$t('navbar.logOut')}}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="home-main">
      <div class="home-mian-box">
        <div class="home-mian-t af">
          <el-row>
            <el-col :span="6">
              <div class="home-list home-personnel">
                <img src="../../assets/images/home/home-personnel.png" alt />
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
                <el-button type="primary" round icon="el-icon-view" @click="adminPage">人员智慧管理</el-button>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="home-list home-mechanics">
                <img src="../../assets/images/home/hme-mechanics.png" alt />
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
              <div class="home-list home-video" @click="videoMonitoring()">
                <img src="../../assets/images/home/home-video.png" alt />
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
                <img src="../../assets/images/home/home-ambient.png" alt />
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
            <el-col :span="6" :offset="3" style="width: 420px;margin-left:-50px;">
              <div class="home-list home-list-lg home-materiel-sm">
                <img src="../../assets/images/home/home-materiel-sm.png" alt />
                <img src="../../assets/images/home/home-materiel-lg.png" alt class="materiel-lg" />
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
                <img src="../../assets/images/home/home-progress.png" alt />
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
                <img src="../../assets/images/home/home-quality.png" alt />
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
                <el-button type="primary" round icon="el-icon-view">系统管理</el-button>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="home-list home-quality" @click="systemManager()">
                <img src="../../assets/images/home/home-quality.png" alt />
                <div class="home-list-text">
                  <ul class="af">
                    <li>用户管理</li>
                    <li>角色管理</li>
                    <li>工地管理</li>
                  </ul>
                </div>
                <el-button type="primary" round icon="el-icon-view">系统管理</el-button>
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
import { handleCofirm } from "@/utils/confirm";

export default {
  data() {
    return {
      username: "",
      orgSite: ""
    };
  },
  mounted() {
    var getuser = JSON.parse(sessionStorage.getItem("user"));
    console.log(getuser);
    this.username = getuser.name;
    this.orgSite = getuser.orgSite;
  },
  computed: {
    ...mapGetters(["name", "avatar"])
  },
  methods: {
    ...mapActions({
      userLogout: "logout"
    }),
    // 退出
    logout() {
      handleCofirm("您确定退出吗？")
        // 点击确定 删除sessStorage本地存储 返回到登录页面
        .then(res => {
          sessionStorage.removeItem("userId");
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("token");
          this.$router.push({ path: "/login" });
        });
    },
    // 人员智慧管理
    adminPage() {
      this.$router.push({ path: "/home" });
    },
    // 系统管理
    systemManager() {
      this.$router.push({
        name: "home", // 只是把query改了，其他都没变
        query: {
          code: "1"
        }
      });
    },
    videoMonitoring() {
      this.$router.push({
        name: "home", // 只是把query改了，其他都没变
        query: {
          code: "2"
        }
      });
    }
  },
  watch: {}
};
</script>
<style lang="stylus" scoped>
.home-box {
  width: 100%;
  height: 100%;
}

ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}

.home-box {
  position: absolute;
  min-width: 1280px;
  min-height: 590px;
}

/* 头部样式 */
.home-header {
  position: relative;
  height: 70px;
}

.home-header-min-box {
  position: relative;
  padding: 0 50px;
  height: 100%;
}

.home-header-left {
  height: 100%;
  box-sizing: border-box;
  padding-top: 10px;
}

.header-left img {
  width: 50px;
  height: 50px;
}

.header-right {
  width: 342px;
  height: 31px;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 50px;
  color: rgba(0, 88, 162, 1);
  opacity: 1;
}

.home-header-right {
  height: 100%;
  box-sizing: border-box;
  padding-top: 20px;
}

.interval {
  width: 0px;
  height: 20px;
  border: 1px solid rgba(18, 85, 153, 1);
  margin: 5px 10px 0 5px;
  opacity: 1;
}

.out {
  margin-right: 10px;
  padding-top: 6px;
}

.out-text {
  height: 21px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(0, 88, 162, 1);
  opacity: 1;
}

.name-text {
  height: 21px;
  margin-left: 10px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 31px;
  color: rgba(0, 88, 162, 1);
  opacity: 1;
}

/* 主体样式 */
.home-main {
  width: 100%;
  height: calc(100% - 70px);
  background: radial-gradient(circle, rgba(151, 207, 255, 1) 0%, rgba(0, 88, 162, 1) 100%);
  opacity: 0.9;
  position: relative;
}

.home-mian-box {
  width: 1280px;
  height: 520px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -640px;
  margin-top: -260px;
}

.home-list {
  width: 320px;
  height: 260px;
  position: relative;
}

.home-list-lg {
  width: 420px;
  height: 260px;
}

.home-personnel {
  background-image: url('../../assets/images/home/home-personnel-bg.png');
}

.home-mechanics {
  background-image: url('../../assets/images/home/home-mechanics-bg.png');
}

.home-video {
  background-image: url('../../assets/images/home/home-video-bg.png');
}

.home-ambient {
  background-image: url('../../assets/images/home/home-ambient-bg.png');
}

.home-materiel-sm {
  background: rgba(255, 255, 255, 1);
}

.home-progress {
  background-image: url('../../assets/images/home/home-progress-bg.png');
}

.home-quality {
  background-image: url('../../assets/images/home/home-quality-bg.png');
}

.home-list-text {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  padding: 30px 0 0 30px;
}

// 
.home-list-text li {
  float: left;
  margin: 2px 6px;
}

.home-list-lg .home-list-text li {
  color: #0058A2;
}

.home-list img {
  width: 65px;
  height: 65px;
  position: absolute;
  top: 98px;
  right: 49px;
}

.home-list img.materiel-lg {
  width: 100%;
  height: 100%;
  top: 30px;
}

.Container {
  min-width: 1280px;
  margin: 0 auto;
}

.af:after {
  content: '';
  display: block;
  clear: both;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.borderline {
  border: 1px solid rgba(0, 88, 162, 1);
}

.loginimg {
  width: 30px;
  height: 30px;
}
</style>
