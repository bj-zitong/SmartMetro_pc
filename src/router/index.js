import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Layout from '@/layout/layout'
import sm_authentication from '@/sm_authentication/sm_authentication'

Vue.use(Router)

/**
 * alwaysShow: true           if set true, will always show the root menu, whatever its child routes length
 *                            if not set alwaysShow, only more than ont route under the children
 *                            it will becomes nested mode, otherwise not show the root menu
 * alwaysShow: true           如果设置为true,它将总是现在在根目录。如果不设置的话，当它只有1个子路由的时候，会把
 *                            它的唯一子路由放到跟目录上来，而不显示它自己本身。
 */
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/register')
  },
  {
    path: '/Selectpage',
    name: 'Selectpage',
    component: () => import('@/views/Selectpage/Selectpage')
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/',
    hidden: true,
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/homepage'),
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    meta: {
      icon: 'tickets',
      title: '个人中心'
    },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/user/profile'),
        meta: { icon: 'warning', title: '个人中心' }
      },
      {
        path: 'avatar',
        name: 'Avatar',
        component: () => import('@/views/user/profile'),
        meta: { icon: 'warning', title: '修改头像' }
      }
    ]
  },
  {
    path: '/labor_Subcontract',
    component: Layout,
    alwaysShow: true,
    meta: {
      icon: 's-order',
      title: '劳务分包管理'
    },
    redirect: 'labor_Subcontract1',
    children: [
      {
        path: 'labor_Subcontract1',
        name: 'labor_Subcontract1',
        component: () => import('@/views/labor_Subcontract/labor_Subcontract1'),
        meta: { icon: '', title: '劳务分包管理一组' }
      },
      {
        path: 'labor_Subcontract2',
        name: 'labor_Subcontract2',
        component: () => import('@/views/labor_Subcontract/labor_Subcontract2'),
        meta: { icon: '', title: '劳务分包管理二组' }
      }
    ]
  },
  {
    path: '/team_message',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '班组管理',
      icon: 'svg-droplet'
    },
    children: [
      {
        path: 'message',
        name: 'message',
        component: () => import('@/views/team_message/message'),
        meta: { title: '班前信息', icon: '' }
      },
      {
        path: 'talkrecord',
        name: 'talkrecord',
        component: () => import('@/views/team_message/talkrecord'),
        meta: { title: '班前讲话记录', icon: '' }
      }
    ]
  },
  {
    path: '/roster',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '花名册',
      icon: 'svg-droplet'
    },
    children: [
      {
        path: 'manager',
        name: 'manager',
        component: () => import('@/views/roster/manager'),
        meta: { title: '管理人员', icon: '' }
      },
      {
        path: 'personnel',
        name: 'personnel',
        component: () => import('@/views/roster/personnel'),
        meta: { title: '劳务人员', icon: '' }
      },
      {
        path: 'equipmentSpecialist',
        name: 'equipmentSpecialist',
        component: () => import('@/views/roster/equipmentSpecialist'),
        meta: { title: '设备专用人员', icon: '' }
      },
      {
        path: 'otherStaffs',
        name: 'otherStaffs',
        component: () => import('@/views/roster/otherStaffs'),
        meta: { title: '其他服务类人员', icon: '' }
      }
    ]
  },
  {
    path: '/foreignpersonnel',
    component: Layout,
    meta: {
      icon: 'question',
      title: '外来人员'
    },
    redirect: '/foreignpersonnel/index',
    children: [
      {
        path: 'index',
        name: 'CustomComponent',
        component: () => import('@/views/foreignpersonnel/index'),
        meta: { icon: 'guide', title: '外来人员' }
      }
    ]
  },
  {
    path: '/aa',
    name: 'aa',
    hidden: true,
    component: sm_authentication,
    children: [
      {
        path: 'aa',
        name: 'aa',
        component: () => import('@/views/aa/aa'),
        meta: { title: '' }
      }
    ]
  }
]
export default new Router({
  // mode: 'history',  require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
  RouterMap: asyncRouterMap
})
export const asyncRouterMap = [
  {
    path: '/foreignpersonnel',
    component: Layout,
    meta: {
      icon: 'question',
      title: '外来人员'
    },
    redirect: '/foreignpersonnel/index',
    children: [
      {
        path: 'index',
        name: 'CustomComponent',
        component: () => import('@/views/foreignpersonnel/index'),
        meta: { icon: 'guide', title: '外来人员' }
      }
    ]
  },
  {
    path: '/foreignpersonnel',
    component: Layout,
    meta: {
      icon: 'question',
      title: '外来人员'
    },
    redirect: '/foreignpersonnel/index',
    children: [
      {
        path: 'index',
        name: 'CustomComponent',
        component: () => import('@/views/foreignpersonnel/index'),
        meta: { icon: 'guide', title: '外来人员' }
      }
    ]
  }
]
