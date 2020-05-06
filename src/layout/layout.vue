<template>
  <div class="app-wrapper">
    <navbar @selectNavBar="selectNavBar"></navbar>
    <sidebar :sideBarData="sideBarData"></sidebar>
    <div class="main-container">
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
            // console.log(x)
            this.sideBarData.push(x);
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
  .main-container {
    padding-left: 201px;
    padding-top: 140px;
  }
}
</style>
