<template>
  <div class="tabs-view-container">
    <router-link
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : '' "
      v-for="(tag, index) in visitedTabsView"
      :to="tag.path"
      :key="index"
    >
      <el-tag
        closable
        :disable-transitions="false"
        @click.native="tagClick(tag)"
        @close.prevent.stop="handleClose(tag)"
      >{{tag.name}}</el-tag>
    </router-link>
    <!-- <el-button type="primary" style="float:right" @click="clearAll">清楚全部</el-button> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      // visitedTabsView:[]
    };
  },
  created() {
    this.addTabsView();
  },
  computed: {
    ...mapGetters(["visitedTabsView"])
  },
  methods: {
    // visitedTabsView: {
    //   get: function() {
    //     // return this.$store.state.tabList.tabs;
    //   },
    //   set: function(newValue) {
    //     console.log(newValue)
    //     // this.$store.state.tabList.tabs = newValue;
    //   }
    // },
    ...mapActions(["addVisitedTabsView", "delVisitedTabsView"]),
    addTabsView() {
      const route = this.generateRoute();
      if (!route) {
        return false;
      }
      this.addVisitedTabsView(this.generateRoute());
    },
    generateRoute() {
      if (this.$route.name) {
        return this.$route;
      }
      return false;
    },
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name;
    },
    handleClose(tag) {
      this.delVisitedTabsView(tag).then(tags => {
        console.log(tag)
        // 如果关闭的是当前显示的页面，就去到前一个 tab-view 页面
        if (this.isActive(tag)) {
          const lastTag = tags.slice(-1)[0];
          // 前一个 tab-view 页面存在，就跳；不存在就到首页
          if (lastTag) {
            this.$router.push(lastTag.path);
          } else {
            this.$router.push("/");
          }
        }
      });
    },
    // clearAll(this.delateRoute()),
    tagClick(tag) {
      this.$emit("tagName", tag);
    }
  },
  watch: {
    $route() {
      // console.log(this.$route)
      this.addTabsView();
    }
  }
};
</script>

<style lang="stylus">
.tabs-view-container {
  padding: 5px;
  border-bottom: 1px solid #dfdfdf;

  .tags-view-item {
    .el-tag {
      margin: 0 3px;

      &:first-child {
        margin-left: 0;
      }
    }

    &.active {
      .el-tag {
        background-color: #00b4aa;
        color: #fff;

        .el-icon-close {
          color: #fff;
        }

        &:before {
          position: relative;
          content: '';
          background: #fff;
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-right: 2px;
        }
      }
    }
  }
}
</style>
