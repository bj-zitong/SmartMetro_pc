<template>
  <div class="top-navbar">
    <div style="width:98%;margin:0 auto">
      <el-menu mode="horizontal">
        <div>
          <img src="/static/image/header_login.png" alt class="WisdomSite_title_login" />
          <div index="1" class="title-name">{{$t('navbar.title')}}</div>
        </div>
        <div class="avatar-container">
          <div class="exit_login">
            <img src="/static/image/exit_login.png" alt class="ri_icon" />
            <el-link :underline="false" style="exit_login_text" @click.native="logout">退出登录</el-link>
          </div>
          <div class="Head_portrait">
            <img src="/static/image/Head_portrait.png" alt class="ri_icon_name" />
            <el-link :underline="false" style="border-right:none">名称</el-link>
          </div>
        </div>
      </el-menu>
    </div>
    <el-tabs type="border-card" class="hed_tab" @tab-click="handleClick">
      <el-tab-pane name="home" style="margin-left:30px">
        <span slot="label">
          <img :src="objImg.home" alt class="icon_list" style="margin-left:20px" />首页
        </span>
      </el-tab-pane>
      <el-tab-pane name="smrz">
        <span slot="label">
          <img :src="objImg.smrz" alt class="icon_list" />实名认证
        </span>
      </el-tab-pane>
      <el-tab-pane name="kaoqin">
        <span slot="label">
          <img :src="objImg.kaoqin" alt class="icon_list" />智慧考勤
        </span>
      </el-tab-pane>
      <el-tab-pane name="jypx">
        <span slot="label">
          <img :src="objImg.jypx" alt class="icon_list" />培训教育
        </span>
      </el-tab-pane>
      <el-tab-pane name="cxgl">
        <span slot="label">
          <img :src="objImg.cxgl" alt class="icon_list" />诚信管理
        </span>
      </el-tab-pane>
      <el-tab-pane name="rycw">
        <span slot="label">
          <img :src="objImg.rycw" alt class="icon_list" />人员测温
        </span>
      </el-tab-pane>
      <el-tab-pane name="gyxz">
        <span slot="label">
          <img :src="objImg.gyxz" alt class="icon_list" />工友须知
        </span>
      </el-tab-pane>
      <el-tab-pane name="yqgl">
        <span slot="label">
          <img :src="objImg.yqgl" alt class="icon_list" />疫情管理
        </span>
      </el-tab-pane>
      <el-tab-pane name="kfg">
        <span slot="label">
          <img :src="objImg.kfg" alt class="icon_list" />开复工管理
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Screenfull from "@/components/screenfull";
import ChangeTheme from "@/components/theme";
import main from '../main'
export default {  
  name: "top-navbar",
  data() {
    return {
      objImg: {
        home: "/static/image/home.png",
        smrz: "/static/image/smrz.png",
        kaoqin: "/static/image/kaoqin.png",
        jypx: "/static/image/jypx.png",
        cxgl: "/static/image/cxgl.png",
        rycw: "/static/image/rycw.png",
        gyxz: "/static/image/gyxz.png",
        yqgl: "/static/image/yqgl.png",
        kfg: "/static/image/kfg.png"
      }
    };
  },
  name: "",
  components: {
    Screenfull,
    ChangeTheme
  },
  computed: {
    ...mapGetters(["name", "avatar"])
  },
  methods: {
    ...mapActions({
      userLogout: "logout"
    }),
    handleClick(tab, event) {
      // this.$router.push({ path: "/dome" });
      tab.name == "home"
        ? (this.objImg.home = "/static/image/selected_soye.png")
        : (this.objImg.home = "/static/image/home.png");
      tab.name == "smrz"
        ? (this.objImg.smrz = "/static/image/selected_smrz.png")
        : (this.objImg.smrz = "/static/image/smrz.png");
      tab.name == "kaoqin"
        ? (this.objImg.kaoqin = "/static/image/selected_zhkq.png")
        : (this.objImg.kaoqin = "/static/image/kaoqin.png");
      tab.name == "jypx"
        ? (this.objImg.jypx = "/static/image/selected_pxjy.png")
        : (this.objImg.jypx = "/static/image/jypx.png");
      tab.name == "cxgl"
        ? (this.objImg.cxgl = "/static/image/selected_cxjy.png")
        : (this.objImg.cxgl = "/static/image/cxgl.png");
      tab.name == "rycw"
        ? (this.objImg.rycw = "/static/image/selected_rycw.png")
        : (this.objImg.rycw = "/static/image/rycw.png");
      tab.name == "gyxz"
        ? (this.objImg.gyxz = "/static/image/selected_gyxz.png")
        : (this.objImg.gyxz = "/static/image/gyxz.png");
      tab.name == "yqgl"
        ? (this.objImg.yqgl = "/static/image/selected_gyxz.png")
        : (this.objImg.yqgl = "/static/image/yqgl.png");
      tab.name == "kfg"
        ? (this.objImg.kfg = "/static/image/selected_kfg.png")
        : (this.objImg.kfg = "/static/image/kfg.png");
    },
    logout() {
      this.userLogout()
        .then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="stylus">
.top-navbar {
  position: fixed;
  width: 100%;
  z-index: 10;
  height: 140px;
  background: rgba(0, 88, 162, 1);
  opacity: 1;

  .WisdomSite_title {
    width: 500px;
    height: 36px;
    float: left;
    h6 {
      font-size: 24px;
      color: #fff;
      opacity: 1;
      float: left;
      margin: 0;
      padding: 20px 0 0 20px;
      font-weight: normal;
    }
  }
  .WisdomSite_title_login {
    width: 36px;
    height: 36px;
    float: left;
    margin: 17px 0 0 30px;
  }

  .el-menu {
    border-bottom: none !important;
    background: rgba(0, 88, 162, 1);
    .lang-select {
      position: absolute;
      top: 18px;
      right: 150px;
    }

    .lang-select /deep/ .el-dropdown {
      font-size: 20px;
      color: #fff;
    }

    .avatar-container {
      position: absolute;
      top: 20px;
      right: -45px;
      width: 300px;
      outline: none;
      .avatar-wrapper {
        cursor: pointer;
      }

      .ri_icon {
        width: 16px;
        height: 16px;
        float: left;
        margin-top: 1px;
        margin-right: 3px;
      }

      .ri_icon_name {
        width: 16px;
        height: 16px;
        margin: 1px 10px 0 20px;
        float: left;
      }
      .exit_login {
        float: left;
      }

      .Head_portrait {
        float: left;
      }
    }

    .el-link.el-link--default {
      color: #fff;
      border-right: 2px solid #fff;
      padding-right: 22px;
    }

    .username-wrapper {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      color: #fff;
    }
  }
}

.top-navbar /deep/ .el-menu-item {
  font-size: 20px;
}

.top-navbar /deep/ .theme-container {
  position: absolute;
  top: 15px;
  right: 225px;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
}

.title-name {
  padding: 20px 0 0 20px;
  float: left;
  font-size: 24px;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}

.top-navbar .screenfull {
  position: absolute;
  top: 20px;
  right: 190px;
}

.el-tabs--border-card {
  background-color: #F5F7FA;
  border-bottom: 1px solid #E4E7ED;
  margin: 0;
  height: 50px;
  border-radius: 30px;
  line-height: 50px;
}

.hed_tab>.el-tabs__header {

  border-radius: 30px !important;
}

.hed_tab /deep/ .is-active {
  border-radius: 30px !important;
  background: #FFFFFF;
  color: rgba(0, 88, 162, 1);
}

.hed_tab /deep/ .el-tabs__nav-scroll {
  background: #0058a2 url('../../static/image/bj_login.png');
  color: #fff;
  border-radius: 30px;
  letter-spacing: 4px;
  font-size: 20px;
  font-weight: 400;
  height: 50px;
}

.hed_tab {
  border: none;
  width: 94.5%;
  margin: 0 auto;
  position: relative;
  top: 30px;
}

.icon_list {
  width: 23px;
  height: 23px;
  margin: 6px 10px 0 0;
  float: left;
}

.el-tabs--border-card>.el-tabs__content {
  padding: 0;
}

.hed_tab>.el-tabs__header .el-tabs__item {
  color: #fff;
}

.hed_tab>.el-tabs__header .el-tabs__item+.el-tabs__item {
  margin-right: 60px;
}

.hed_tab>.el-tabs__nav-wrap.is-scrollable {
  padding: 0 0;
}
</style>
