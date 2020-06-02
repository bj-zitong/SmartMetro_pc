<template>
  <div class="app-wrapper" :style="scrollTop>5?'':'height:100%'">
    <navbar @selectNavBar="selectNavBar"></navbar>
    <sidebar :sideBarData="sideBarData"></sidebar>
    <div
      :class="hideMainContainer=='首页'||hideMainContainer=='工友须知'||hideMainContainer=='开复工管理'||hideMainContainer=='工地管理'||hideMainContainer=='角色管理'||hideMainContainer=='用户管理'||hideMainContainer=='分析'||hideMainContainer=='预警'?'main-container1':'main-container'"
    >
      <tabs-view @tagName="tagName"></tabs-view>
      <app-main></app-main>
    </div>
  </div>
</template>
<script>
import Navbar from "./navbar";
import Sidebar from "./sidebar/sidebar";
import TabsView from "./tabs-view";
import AppMain from "./app-main";
import { mapGetters } from "vuex";
export default {
  components: {
    Navbar,
    Sidebar,
    TabsView,
    AppMain
  },
  data() {
    return {
      sideBarData: "",
      hideMainContainer: "",
      scrollTop: "",
      returnedItem: null
    };
  },
  computed: {
    ...mapGetters(["routers"])
  },
  mounted() {
    window.addEventListener("scroll", this.windowScroll);
  },
  methods: {
    windowScroll() {
      // 滚动条距离页面顶部的距离
      // 以下写法原生兼容
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    },
    selectNavBar(param) {
      console.log(param);
      this.sideBarData = [];
      this.routers.map(x => {
        if (x.name == param) {
          this.hideMainContainer = x.name;
          console.log(x);
          this.sideBarData = x;
          this.$router.push({ name: x.name });
          return;
        }
      });
    },
    tagName(tag) {
      console.log(this.routers);
      console.log(tag.name);
      // var returnedItem; //定义一个不不赋值的变量
      this.find(this.routers, tag.name);
      console.log(this.returnedItem.meta.parent)
      this.routers.map(x => {
        if (x.name == this.returnedItem.meta.parent) {
          console.log(x)
          this.hideMainContainer = tag.name;
          // console.log(x);
          this.sideBarData = x;
          this.$router.push({ name: x.name });
          return;
        }
      });
      // var item = find(array, 7);
      // if(this.returnedItem.parent);
      // this.hideMainContainer = tag.name;
      // this.sideBarData = tag;
    },
    find(arr, id) {
      arr.forEach(item => {
        //利用foreach循环遍历
        console.log(item);
        if (item.hasOwnProperty("meta")) {
          if (item.meta.title == id) {
            //判断递归结束条件
            this.returnedItem = item;
            console.log(item);
            return item;
          } else if (item.hasOwnProperty("children")) {
            if (item.children.length >0) {
              //判断chlidren是否有数据
              this.find(item.children, id); //递归调用
            }
          }
        }
      });
    }
  }
};
</script>
<style scoped lang="stylus">
.app-wrapper {
  position: absolute;
  width: 100%;
  // height: 100%;
  background: rgba(246, 247, 248, 1);

  .main-container {
    padding-left: 260px;
    padding-top: 140px;
    height: 100%;
  }

  .main-container1 {
    padding-left: 0;
    padding-top: 140px;
    height: 100%;
  }
}
</style>