<template>
  <div class="top-navbar">
    <div class="WisdomSite_title">
      <img src="/static/image/WisdomSite_title_login.png" alt class="WisdomSite_title_login" />
      <h6>智慧地铁管理系统</h6>
    </div>
  <div class="rightNav_Logout">
       <img src="/static/image/WisdomSite_title_login.png" alt class="WisdomSite_title_login" />
       <el-link :underline="false">退出登录</el-link>
  </div>

    <!-- <el-menu mode="horizontal" text-color="#fff" active-text-color="#fff">
      <router-link to="/home" style="display: table;">
        <el-menu-item index="1" class="title-name">{{$t('navbar.title')}}</el-menu-item>
      </router-link>
      <div class="avatar-container">
        <el-dropdown trigger="click">
          <div class="avatar-wrapper">
            <img class="user-avatar" :src="avatar" />
            <div class="username-wrapper">
              <span class="user-name">{{name}}</span>
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
    </el-menu>-->
    <!-- https://github.com/settings/emails -->
    Zit12345678
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import LangSelect from "@/components/lang-select";
import Screenfull from "@/components/screenfull";
import ChangeTheme from "@/components/theme";
export default {
  name: "",
  components: {
    LangSelect,
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
      font-weight:normal
    }
  }
  .WisdomSite_title_login {
    width: 36px;
    height: 36px;
    float: left;
    margin: 17px 0 0 50px;
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
      top: 15px;
      right: 40px;

      .avatar-wrapper {
        cursor: pointer;
      }
    }
    .avatar-container /deep/ .user-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
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

  &:hover {
    background-color: transparent;
  }

  &:focus {
    background-color: transparent;
  }
}
.top-navbar /deep/ .theme-container {
  position: absolute;
  top: 15px;
  right: 225px;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  // background-image linear-gradient(red, blue)
}
.top-navbar .screenfull {
  position: absolute;
  top: 20px;
  right: 190px;
}
</style>
