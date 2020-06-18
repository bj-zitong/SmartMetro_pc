<template>
  <div style="width:100%;margin:0 auto;height:70px">
    <el-menu mode="horizontal">
      <div>
        <img src="/static/image/header_login.png" alt class="WisdomSite_title_login" />
        <div index="1" class="title-name" @click="homepage" title="返回首页">城市轨道交通智慧工地管理系统—{{tabTitle}}</div>
      </div>
      <div class="avatar-container">
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
              <el-dropdown-item @click.native="removeSwitch">
                <span style="display:block;">去掉切换</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="exit_login">
          <el-link :underline="false" class="exit_login_text">{{orgSite}}</el-link>
          <el-divider direction="vertical" class="borderline"></el-divider>
        </div>
      </div>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { handleCofirm } from "@/utils/confirm";
export default {
  props: {
    tabTitle: String
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
     handleCofirm("您确定退出吗？")
        // 点击确定 删除sessStorage本地存储 返回到登录页面
        .then(res => {
          var url =
            "/systemUrl/smart/auth/" + sessionStorage.getItem("userId") + "/logout";
          this.http.get(url, null).then(res => {
            if (res.code == 200) {
              this.$message("退出成功！");
              sessionStorage.removeItem("userId");
              sessionStorage.removeItem("user");
              sessionStorage.removeItem("token");
              this.$router.push({ path: "/login" });
            }
          });
        });
    },
    removeSwitch(){
         
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
