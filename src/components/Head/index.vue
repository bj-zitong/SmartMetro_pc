<template>
  <div style="width:100%;margin:0 auto;height:70px">
    <el-menu mode="horizontal">
      <div>
        <img src="/static/image/header_login.png" alt class="WisdomSite_title_login" />
        <div index="1" class="title-name" @click="homepage" title="返回首页">城市轨道交通智慧工地管理系统—{{tabTitle}}</div>
      </div>
      <div class="avatar-container">
        <div class="exit_login">
          <el-link :underline="false" class="exit_login_text">{{orgSite}}</el-link>
          <el-divider direction="vertical" class="borderline"></el-divider>
        </div>
        <div class="Head_portrait">
          <img src="/static/image/Head_portrait.png" alt class="ri_icon_name" />
          <span>{{username}}</span>
          <el-dropdown trigger="click">
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
    </el-menu>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    tabTitle: String,
  },
  name: "",
  data() {
    return {
      username: "",
      orgSite: ""
    };
  },
  computed: {
    ...mapGetters(["name", "avatar"])
  },
  mounted() {
    // var getuser = sessionStorage.setItem('user',res.data);
    var getuser = JSON.parse(sessionStorage.getItem("user"));
    this.username = getuser.name;
    this.orgSite = getuser.orgSite;
  },
  methods: {
    logout() {
      this.$router.push({ path: "/login" });
    },
    ...mapActions({
      userLogout: "logout"
    }),
    homepage() {
      this.$router.push({ path: "/Selectpage" });
    }
  }
};
</script>
// <style lang="stylus">
// .top-navbar /deep/ .el-menu-item {
//   font-size: 20px;
// }

// .top-navbar /deep/ .theme-container {
//   position: absolute;
//   top: 15px;
//   right: 225px;
//   color: #fff;
//   font-size: 24px;
//   cursor: pointer;
// }

// .title-name {
//   padding: 20px 0 0 13px;
//   float: left;
//   font-size: 24px;
//   font-weight: bold;
//   color: rgba(255, 255, 255, 1);
//   cursor: pointer;
// }

// .top-navbar .screenfull {
//   position: absolute;
//   top: 20px;
//   right: 190px;
// }

// .el-tabs--border-card {
//   background-color: #F5F7FA;
//   border-bottom: 1px solid #E4E7ED;
//   margin: 0;
//   height: 50px;
//   border-radius: 30px;
//   line-height: 50px;
// }

// .hed_tab>.el-tabs__header {
//   border-radius: 30px !important;
// }

// .hed_tab /deep/ .is-active {
//   border-radius: 30px !important;
//   background: #FFFFFF;
//   color: rgba(0, 88, 162, 1);
//   font-weight: 400;
// }

// .hed_tab /deep/ .el-tabs__nav-scroll {
//   background: #0058a2 url('../../../static/image/bj_login.png');
//   color: #fff;
//   border-radius: 30px;
//   letter-spacing: 4px;
//   font-size: 20px;
//   font-weight: 400;
//   height: 50px;
// }

// .hed_tab {
//   border: none;
//   width: 95.5%;
//   margin: auto 50px;
//   position: relative;
//   top: 10px;
// }

// .icon_list {
//   width: 23px;
//   height: 23px;
//   margin: 13px 10px 0 0;
//   float: left;
// }

// .el-tabs--border-card>.el-tabs__content {
//   padding: 0;
// }

// .borderline {
//   border: 1px solid #fff;
// }

// .hed_tab>.el-tabs__header .el-tabs__nav {
//   width: 100%;
// }

// .hed_tab>.el-tabs__header .el-tabs__item:first-child {
//   margin-left: 10px;
//   width: 8%;
// }

// .hed_tab>.el-tabs__header .el-tabs__item:last-child {
//   width: 11%;
// }

// .hed_tab>.el-tabs__nav-wrap.is-scrollable {
//   padding: 0 0;
// }
// </style>
