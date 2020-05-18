<template>
  <div class="app-wrapper">
    <navbar @selectNavBar="selectNavBar"></navbar>
    <sidebar :sideBarData="sideBarData"></sidebar>
    <div :class="hideMainContainer=='首页'||hideMainContainer=='工友须知'||hideMainContainer=='开复工管理'||hideMainContainer=='工地管理'||hideMainContainer=='角色管理'||hideMainContainer=='用户管理'?'main-container1':'main-container'">
      <tabs-view></tabs-view>
      <app-main></app-main>
    </div>
  </div>
</template>
<script>
  import Navbar from './navbar'
  import Sidebar from './sidebar/sidebar'
  import TabsView from './tabs-view'
  import AppMain from './app-main'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      Navbar,
      Sidebar,
      TabsView,
      AppMain
    },
    data() {
      return {
        sideBarData:'',
        hideMainContainer:''
      }
    },
    computed: {
      ...mapGetters([
        'routers'
      ])
    },
    methods:{

      selectNavBar(param){
        this.sideBarData = [];
        this.routers.map((x)=>{
          if(x.name == param){
            this.hideMainContainer=x.name
            this.sideBarData=x;
            this.$router.push({name: x.name});
            return;
          }
        })
      }
    }
  }
</script>
<style scoped lang="stylus">
.app-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  background:rgba(246,247,248,1);
  .main-container {
    padding-left: 260px;
    padding-top: 140px;
  }
  .main-container1{
    padding-left:0;
    padding-top: 140px;
  }
}
</style>
