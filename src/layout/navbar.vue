<template>
  <div class="top-navbar">
    <headUser :tabTitle="tabTitle" />
    <el-tabs
      v-model="editableTabsValue"
      type="border-card"
      class="hed_tab"
      @tab-click="handleClick"
    >
      <el-tab-pane v-for="(item,index) in list" :key="index" :label="item.title" :name="item.title">
        <span slot="label" class="nav-text">
          <img :src="num==index?item.afterChangeimg:item.beforeChangeimg" alt class="icon_list" />
          {{item.title}}
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import main from "../main";
import headUser from "@/components/Head";
//头部切换
import list from "./sidebar/headerTab";
export default {
  name: "top-navbar",
  data() {
    return {
      //用户管理
      systemList: [
        {
          title: "用户管理",
          beforeChangeimg: "../static/image/yonghumanager.png",
          afterChangeimg: "../static/image/usercheck.png"
        },
        {
          title: "角色管理",
          beforeChangeimg: "../static/image/rolemanager.png",
          afterChangeimg: "../static/image/rolecheck.png"
        },
        {
          title: "工地管理",
          beforeChangeimg: "../static/image/worker.png",
          afterChangeimg: "../static/image/workermanager.png"
        }
      ],
      //视频监控
      videoList: [
        {
          title: "视频监控",
          beforeChangeimg: "../static/image/yonghumanager.png",
          afterChangeimg: "../static/image/usercheck.png"
        },
        {
          title: "回放",
          beforeChangeimg: "../static/image/rolemanager.png",
          afterChangeimg: "../static/image/rolecheck.png"
        },
        {
          title: "分析",
          beforeChangeimg: "../static/image/worker.png",
          afterChangeimg: "../static/image/workermanager.png"
        },
        {
          title: "预警",
          beforeChangeimg: "../static/image/worker.png",
          afterChangeimg: "../static/image/workermanager.png"
        },
        {
          title: "设备管理",
          beforeChangeimg: "../static/image/worker.png",
          afterChangeimg: "../static/image/workermanager.png"
        }
      ],
      //快速进入页面标题传到父组件头部
      tabTitle: "",
      editableTabsValue: "",
      num: 0,
      list: ""
    };
  },
  name: "",
  components: {
    headUser
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
    
    this.list =
      this.$route.query.code == 1? this.systemList: this.$route.query.code == 2? this.videoList: this.$route.query.code == 3?list:''
    // this.editableTabsValue = this.$route.query.code == 1 ? "0" : "1";
    if (this.$route.query.code == 1) {
      this.editableTabsValue = "用户管理";
      this.$emit("selectNavBar", "用户管理");
      this.$router.push({ path: "/userManager" });
      this.tabTitle = "系统管理";
      this.num = 0;
    } else if (this.$route.query.code == 2) {
      this.editableTabsValue = "视频监控";
      this.$emit("selectNavBar", "视频监控");
      this.$router.push({ path: "/south" });
      this.tabTitle = "视频监控管理";
      this.num = 0;
    } else if(this.$route.query.code == 3) {
      this.editableTabsValue = "首页";
      this.$emit("selectNavBar", "首页");
      this.$router.push({ path: "/homeShow" });
      this.tabTitle = "人员智慧管理";
      this.num = 0;
    }
  },
  methods: {
    ...mapActions({
      userLogout: "logout"
    }),
    handleClick(tab, event) {
      this.$emit("selectNavBar", tab.label);
      this.num = tab.index;
    },
    logout() {
      this.$router.push({ path: "/login" });
    },
    qhdq() {
      this.$router.push({ path: "/Statisticsscreen" });
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
      top: 23px;
      right: 70px;
      width: 340px;
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
        width: 30px;
        height: 30px;
        margin: -2px 10px 0 0;
        float: left;
      }

      .exit_login {
        float: right;
      }

      .Head_portrait {
        float: right;
        margin-left:10px;
        span {
          float: left;
          height: 21px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 25px;
          color: rgba(255, 255, 255, 1);
          opacity: 1;
        }
      }
    }

    .el-link.el-link--default {
      color: #fff;
    }

    .username-wrapper {
      display: inline-block;
      height: 30px;
      line-height: 25px;
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
  width:70%;
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
  width: 14%;
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
}

.exit_login_text {
  height: 24px;
  font-size: 18px;
  padding-right: 10px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 24px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}

.borderline {
  border: 1px solid #fff;
  margin-top:4px
}

.hed_tab>.el-tabs__header .el-tabs__nav {
  width: 100%;
}

.hed_tab>.el-tabs__header .el-tabs__item:first-child {
  margin-left: 10px;
  // width: 9.5%;
}

// .hed_tab>.el-tabs__header .el-tabs__item:last-child {
//   width: 11%;
// }

.hed_tab>.el-tabs__nav-wrap.is-scrollable {
  padding: 0 0;
}

.hed_tab .el-tabs__nav {
  min-width: 1280px;
}

@media screen and (max-width: 1600px) {
  .nav-text {
    font-size: 1rem;
  }
}

@media screen and (max-width: 1420px) {
  .nav-text {
    font-size: 0.7rem;
  }
}
</style>
