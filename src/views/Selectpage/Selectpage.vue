<template>
  <div class="home-box">
    <div class="home-header">
      <div class="home-header-min-box af">
        <div class="home-header-left fl">
          <div class="header-left fl">
            <img src="/static/image/header_login.png" alt class="WisdomSite_title_login" />
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
          <el-dropdown trigger="click" style="margin-top:4px;margin-right:20px">
            <div class="avatar-wrapper">
              <div class="username-wrapper">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
              <router-link class="inlineBlock" to="/Statisticsscreen">
                <el-dropdown-item>{{$t('navbar.switchlargeScreen')}}</el-dropdown-item>
              </router-link>
              <router-link class="inlineBlock" to="/updatePassword">
                <el-dropdown-item>{{$t('navbar.changePassword')}}</el-dropdown-item>
              </router-link>
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
        <div class="top">
          <div class="box" @click="adminPage()">
            <img src="/static/image/Selectpage/renyuan.png" alt class="list_img" />
            <h6>人员智慧管理</h6>
          </div>
          <div class="box">
            <img src="/static/image/Selectpage/jxsb.png" alt class="list_img" />
            <h6>机械设备管理</h6>
          </div>
          <div class="box">
            <img src="/static/image/Selectpage/Vector.png" alt class="list_img" />
            <h6>物料智慧管理</h6>
          </div>
          <div class="box">
            <img src="/static/image/Selectpage/huanjingguanli.png" alt class="list_img" />
            <h6>环境与能耗管理</h6>
          </div>
        </div>
        <div class="bottom">
          <div class="box">
            <img src="/static/image/Selectpage/huaban.png" alt class="list_img" />
            <h6>质量管理</h6>
          </div>
          <div class="box">
            <img src="/static/image/Selectpage/zhiliangguanli.png" alt class="list_img" />
            <h6>安全管理</h6>
          </div>
          <div class="box">
            <img src="/static/image/Selectpage/jinduguanli.png" alt class="list_img" />
            <h6>进度智慧管理</h6>
          </div>
          <div class="box" @click="videoMonitoring()">
            <img src="/static/image/Selectpage/shipinjiankong.png" alt class="list_img" />
            <h6>视频监控管理</h6>
          </div>
          <div class="box" @click="systemManager()">
            <img src="/static/image/Selectpage/xitong.png" alt class="list_img" />
            <h6>系统管理</h6>
          </div>
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
    if (getuser != null) {
      this.username = getuser.name;
      this.orgSite = getuser.orgSite;
    }
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
          var url =
            "/systemUrl/smart/auth/" +
            sessionStorage.getItem("userId") +
            "/logout";
          this.http.get(url, null).then(res => {
            if (res.code == 200) {
              this.$message("退出成功！");
              this.$router.push({ path: "/login" });
            }
          });
        });
    },
    // 人员智慧管理
    adminPage() {
      this.$router.push({
        name: "home",
        query: {
          code: "3"
        }
      });
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
  background: rgba(0, 88, 162, 1);
  opacity: 1;
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
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  margin-top: 10px;
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
  // padding-top: 6px;
}

.out-text {
  height: 24px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 24px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  margin: 0 10px;
}

.name-text {
  height: 24px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 24px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  margin: 0 10px;
}

.loginimg {
  width: 30px;
  height: 30px;
  // margin: -2px 10px 0 20px;
  float: left;
}

.username-wrapper {
  display: inline-block;
  height: 30px;
  line-height: 20px;
  color: #fff;
}

/* 主体样式 */
.home-mian-box {
  width: 90%;
  height: 625px;
  // background: red;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;

  .top {
    width: 100%;
    height: 279px;
    display: flex;
    padding: 0 160px;
    justify-content: space-around;
    cursor: pointer;
  }

  .box {
    width: 279px;
    height: 279px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(99, 99, 99, 1);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    // opacity: 0.5;
    border-radius: 4px;
    text-align: center;

    .list_img {
      width: 100px;
      height: 100px;
      text-align: center;
      margin-top: 50px;
    }

    h6 {
      height: 31px;
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 31px;
      color: rgba(0, 88, 162, 1);
      opacity: 1;
      margin: 0;
      padding-top: 48px;
    }
  }

  .bottom {
    width: 100%;
    height: 279px;
    display: flex;
    justify-content: space-around;
    margin-top: 70px;
    cursor: pointer;
  }
}

.top div:hover {
  width: 279px;
  height: 279px;
  background: rgba(219, 239, 255, 1);
  border: 2px solid rgba(107, 186, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 0.5;
  border-radius: 4px;
}

.bottom div:hover {
  width: 279px;
  height: 279px;
  background: rgba(219, 239, 255, 1);
  border: 2px solid rgba(107, 186, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 0.5;
  border-radius: 4px;
}
</style>
