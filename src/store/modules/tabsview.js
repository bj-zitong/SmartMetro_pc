const SET_TABSVIEW = 'SET_TABSVIEW'
const DEL_TABSVIEW = 'DEL_TABSVIEW'

const tabsview = {
  state: {
    visitedTabsView: []
  },
  mutations: {
    [SET_TABSVIEW](state, view) {
      // console.log(view)
      if(view.query.code==3){
        view.meta.title="人员智慧管理"
        state.visitedTabsView=[]
      }
      if(view.query.code==1){
        view.meta.title="系统管理"
        state.visitedTabsView=[]
      }
      if(view.query.code==2){
        view.meta.title="视频监控管理"
        state.visitedTabsView=[]
      }
      // if(view.query.code==undefined){
      //   
      //   state.visitedTabsView.push({ name: view.meta.title, path: view.path })
      // }
      if (state.visitedTabsView.find((n) => n.path === view.path)) {
        return
      }
      state.visitedTabsView.push({ name: view.meta.title, path: view.path })
    },
    [DEL_TABSVIEW](state, view) {
      for (let [i, v] of state.visitedTabsView.entries()) {
        if (v.path === view.path || v.name === view.name) {
          state.visitedTabsView.splice(i, 1)
        }
      }
    }
  },
  actions: {
    // 添加一个新的tabsView
    addVisitedTabsView({ commit }, view) {
      
      commit(SET_TABSVIEW, view)
    },
    // 关闭一个tabsView
    delVisitedTabsView({ commit, state }, view) {
      return new Promise((resolve, reject) => {
        commit(DEL_TABSVIEW, view)
        resolve([...state.visitedTabsView])
      })
    }
  },
  getters: {
    visitedTabsView: state => state.visitedTabsView
  }
}

export default tabsview