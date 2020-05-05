<template>
  <div class="left-sidebar">
    <el-menu
      mode="vertical"
      unique-opened
      @open="handleOpen"
      @close="handleClose"
      background-color=""
      :collapse="isCollapse">
      <sidebar-item v-for="router of sideBarData" :key="router.path" :item="router" :base-path="router.path"></sidebar-item>
    </el-menu>

    <!-- <el-menu 
        :default-active="$route.path"
        unique-opened 
        router 
        @open="handleOpen" 
        @close="handleClose" 
        :collapse="isCollapse">
       
        <template v-for="(item,index) in sideBarData.children" v-if="item.meta.enable == 'Y'">
            <template v-if="item.children.length == 0">
                <el-menu-item :index="item.path" :key="item.meta.title" v-if="item.meta.enable == 'Y'">
                    <i :class="item.meta.icon" v-if="item.meta.icon"></i>
                    <span>{{item.meta.title}}</span>
                </el-menu-item>
            </template>
            <el-submenu :index="index+''" :key="index" v-if="item.children.length > 0" ref="submenu">
                <template v-if="item.meta.enable == 'Y'">
                    <template slot="title">
                        <i :class="item.meta.icon" v-if="item.meta.icon"></i>
                        <span>{{item.meta.title}}</span>
                    </template>
                   
                    <template v-for="(itemChild, itemIndex) in item.children">
                        <el-submenu :index="index+''" :key="itemChild.name" :class="$route.meta.active == itemChild.name ? 'is-active' : ''">
                            <template >
                                <i :class="itemChild.meta.icon" v-if="itemChild.meta.icon"></i>
                                <span slot="title">{{itemChild.meta.title}}</span>
                            </template>
                           
                            <el-menu-item v-for="itemChild_Child in itemChild.children" :index="itemChild_Child.path" :key="itemChild_Child.path">
                                 <i :class="itemChild_Child.icon"></i>
                                 <span slot="title">{{itemChild_Child.meta.title}}</span>
                           </el-menu-item>
                        </el-submenu>
                    </template>
                </template>
            </el-submenu>
        </template>
    </el-menu> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SidebarItem from "./sidebar-item";

export default {
  name: "SideBar",
  props: ["sideBarData"],
  components: {
    SidebarItem
  },
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {
    ...mapGetters(["routers"])
  },
  mounted() {
    console.log(this.routers);
    console.log(this.sideBarData);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log("handleOpen", key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log("handleClose", key, keyPath);
    }
  }
};
</script>
<style lang="stylus" scoped>
.left-sidebar {
  position: fixed;
  top: 140px;
  width: 200px;
  height: 100%;
  min-height: 500px;
}

.el-menu {
  height: 100%;
}
</style>