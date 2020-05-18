<template>
  <div class="top-navbar">
    <div style="width:100%;margin:0 auto;height:70px">
      <el-menu mode="horizontal" style="margin-left:0px">
        <div>
          <img src="/static/image/header_login.png" alt class="WisdomSite_title_login" />
          <div index="1" class="title-name">城市轨道交通智慧工地管理系统—人员智慧管理</div>
        </div>
        <el-button type="success" @click='qhdq'>切换大屏</el-button>
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
    <el-tabs
      v-model="editableTabsValue"
      type="border-card"
      class="hed_tab"
      @tab-click="handleClick"
    >
      <el-tab-pane v-for="(item,index) in list" :key="index" :label="item.title">
        <span slot="label">
          <img :src="num==index?item.afterChangeimg:item.beforeChangeimg" alt class="icon_list" />
          {{item.title}}
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Screenfull from "@/components/screenfull";
import ChangeTheme from "@/components/theme";
import main from "../main";
//头部切换
import list from "./sidebar/headerTab";
export default {
  name: "top-navbar",
  data() {
    return {
      systemList: [
        {
          title: "用户管理",
          beforeChangeimg: "/static/image/kfg.png",
          afterChangeimg: "/static/image/selected_kfg.png"
        },
        {
          title: "角色管理",
          beforeChangeimg: "/static/image/kfg.png",
          afterChangeimg: "/static/image/selected_kfg.png"
        },
        {
          title: "工地管理",
          beforeChangeimg: "/static/image/kfg.png",
          afterChangeimg: "/static/image/selected_kfg.png"
        }
      ],
      editableTabsValue: "",
      num: 1,
      list: ""
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
  watch: {
    deep: true,
    $route(newVal, oldVal) {
      this.tabsValue = newVal.meta.parent;
      // this.editBarImg(newVal.meta.parent);
    },
    tabsValue(newVal, oldVal) {
      this.$emit("selectNavBar", newVal);
    }
  },
  mounted() {
    this.list = this.$route.query.code == 1 ? this.systemList : list;
    this.editableTabsValue = this.$route.query.code == 1 ? "0" : "1";
    if (this.$route.query.code == 1) {
      this.$emit("selectNavBar", "系统管理");
    } else {
      this.$emit("selectNavBar", "实名认证");
    }
  },
  methods: {
    ...mapActions({
      userLogout: "logout"
    }),
    handleClick(tab, event) {
      if (tab.label == "首页") {
        this.$router.push({ path: "/homeShow" });
      }
      this.$emit("selectNavBar", tab.label);
      this.num = tab.index;
    },
    logout() {
      this.$router.push({ path: "/login" });
    },
     qhdq(){
        this.$router.push({ path: "/Statisticsscreen" })
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
    width: 50px;
    height: 50px;
    float: left;
    margin: 10px 0 0 43px;
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
      right: -80px;
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
  padding: 20px 0 0 13px;
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
  font-weight: 400;
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
  width: 95.5%;
  margin: auto 50px;
  position: relative;
  top: 10px;
}

.icon_list {
  width: 23px;
  height: 23px;
  margin: 13px 10px 0 0;
  float: left;
}

.el-tabs--border-card>.el-tabs__content {
  padding: 0;
}

.hed_tab>.el-tabs__header .el-tabs__item {
  padding: 0 20px;
  color: #fff;
  width: 10%;
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
}

.hed_tab>.el-tabs__header .el-tabs__nav {
  width: 100%;
}

.hed_tab>.el-tabs__header .el-tabs__item:first-child {
  margin-left: 10px;
  width: 8%;
}

.hed_tab>.el-tabs__header .el-tabs__item:last-child {
  width: 11%;
}

.hed_tab>.el-tabs__nav-wrap.is-scrollable {
  padding: 0 0;
}
</style>
