<template>
  <div class="left-sidebar" :style="hideSidebar">
    <!-- <el-menu
      mode="vertical"
      unique-opened
      @open="handleOpen"
      @close="handleClose"
      background-color=""
      :collapse="isCollapse">
      <sidebar-item v-for="router of sideBarData.children" :key="router.path" :item="router" :base-path="router.path"></sidebar-item>
    </el-menu> -->
     <el-menu 
        :default-active="$route.path"
        unique-opened 
        router 
        @open="handleOpen" 
        @close="handleClose" 
        :collapse="isCollapse">
        <!-- {{$route.meta.active}} -->
        <template v-for="(item,index) in sideBarData.children" v-if="item.meta.enable == 'Y'">
            <template v-if="item.children.length == 0">
                <el-menu-item :index="item.path" :key="item.meta.title" v-if="item.meta.enable == 'Y'" @click="togglePicture(item.meta.title)">
                    <!-- <i :class="item.meta.icon" v-if="item.meta.icon"></i> -->
                    <img :src="Picture == item.meta.title?item.meta.icon:item.meta.AfterIcon" class="iconImg"/>
                    <span class="title">{{item.meta.title}}</span>
                </el-menu-item>
            </template>
            <el-submenu :index="index+''" :key="index" v-if="item.children.length > 0" ref="submenu">
                <template v-if="item.meta.enable == 'Y'">
                    <template slot="title">
                        <img :src="Picture == item.meta.title?item.meta.AfterIcon:item.meta.icon" class="iconImg"/>
                        <span class="title">{{item.meta.title}}</span>
                    </template>
                    <template v-for="(itemChild, itemIndex) in item.children">
                        <template v-if="itemChild.children && itemChild.children.length > 0">
                          <el-submenu>
                            <span slot="title" class="title title_secondLevel">{{itemChild.meta.title}}</span>
                            <el-menu-item v-for="(lastItem,lasrIndex) in itemChild.children" :index="lastItem.path">{{lastItem.meta.title}}</el-menu-item>
                          </el-submenu>
                        </template>                
                        <template v-else>
                          <el-menu-item :index="itemChild.path" :key="itemChild.name" v-if="itemChild.meta.enable == 'Y'" :class="$route.meta.active == itemChild.name ? 'is-active' : ''">
                              <!-- <img :src="item.meta.icon" class="iconImg"/> -->
                              <span slot="title" class="title">{{itemChild.meta.title}}</span>
                          </el-menu-item>
                        </template>
                    </template>
                </template>
            </el-submenu>
        </template>
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
      isCollapse: false,
      Picture:'',
      hideSidebar:'display:block'//切换到共有须知隐藏侧边栏
    };
  },
  computed: {
    ...mapGetters(["routers"])
  },
  watch: {
    sideBarData(newV,oldV) {
        if(newV.name=="工友须知" || newV.name=="开复工管理"){
           this.hideSidebar='display:none'
        }else{
           this.hideSidebar='display:block'
        }
        
    }
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
    },
    //切换侧边栏图片方法
    togglePicture(title){
      this.Picture=title
    }
  }
};
</script>
<style lang="stylus" scoped>
.left-sidebar {
  position: fixed;
  top: 140px;
  width: 260px;
  height: 100%;
  min-height: 500px;
}

.el-menu {
  height: 100%;
}
.el-submenu .el-menu-item{
  min-width:0;
}
.iconImg{
  width :20px;
  height :20px;
  margin-right :20px
  margin-left :30px
}
.title{
  font-size :18px
}
.title_secondLevel{
  padding-left :60px
}
.el-menu-item.is-active {
background:linear-gradient(180deg,rgba(54,130,243,1) 0%,rgba(0,88,162,1) 100%);
box-shadow:3px 6px 12px rgba(0,88,162,0.23);
opacity:1;
border-radius:4px;
color :#fff
}
.el-submenu .el-menu .el-menu-item{
  padding-left :100px!important;
  font-size :18px
}
</style>