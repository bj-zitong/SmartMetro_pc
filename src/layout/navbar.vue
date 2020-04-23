<template>
  
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
