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
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> 首页
        </span>
      </el-tab-pane>
      <el-tab-pane label="实名认证"></el-tab-pane>
      <el-tab-pane label="智慧考勤"></el-tab-pane>
      <el-tab-pane label="培训教育"></el-tab-pane>
      <el-tab-pane label="诚信管理"></el-tab-pane>
      <el-tab-pane label="人员定位"></el-tab-pane>
      <el-tab-pane label="人员测温"></el-tab-pane>
      <el-tab-pane label="工友须知"></el-tab-pane>
      <el-tab-pane label="疫情管理"></el-tab-pane>
      <el-tab-pane label="开复工管理"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Screenfull from "@/components/screenfull";
import ChangeTheme from "@/components/theme";
export default {
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
<style lang="stylus" scoped>
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
.el-tabs--border-card{
    background-color: #F5F7FA;
    border-bottom: 1px solid #E4E7ED;
    margin: 0;
    height :30px;
    border-radius: 30px;
}
.el-tabs__nav-scroll{
  border-radius: 30px!important;
}
.el-tabs--border-card>.el-tabs__header{
  border-radius: 30px!important;
}
.is-active{
border-radius: 30px!important;
}
</style>
