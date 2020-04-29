import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Layout from '@/layout/layout'

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
    // 用户注册
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/register/register')
    },
    {
        path: '/updatePassword',
        name: 'updatePassword',
        component: () => import('@/views/register/updatePassword')
    },
    //点击进入首页
    {
        path: '/Selectpage',
        name: 'Selectpage',
        component: () => import('@/views/Selectpage/Selectpage')
    },
    //404页面
    // {
    //   path: '/404',
    //   component: () => import('@/views/error-page/404'),
    //   hidden: true
    // },

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
            meta: { title: '人员智慧管理系统' }
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
    //劳务分包管理
    {
        path: '/labor_Subcontract',
        component: Layout,
        // alwaysShow: true,
        meta: {
        icon: 's-order',
        title: '劳务分包管理'
        },
        redirect: 'labor_Subcontract',
        children: [
            {
                path: 'labor_Subcontract',
                name: 'labor_Subcontract',
                component: () => import('@/views/labor_Subcontract/index'),
                meta: { icon: 's-order', title: '劳务分包管理' }
            }
        ]
    },
    //ManagerNewlyadded 花名册管理人员新增 PersonnelNewlyadded
    {
        path: '/LabourNewlyadded',
        component: Layout,
        hidden:true,
        meta: { icon: '', title: '新增劳务' },
        children: [
            {
                path: '/LabourNewlyadded',
                name: 'LabourNewlyadded',
                component: () => import('@/views/ManagerNewlyadded/LabourNewlyadded'),
                meta: { icon: '', title: '新增劳务' },
            }
        ]
    },
    {
        path: '/AddEquipment',
        component: Layout,
        hidden:true,
        meta: { icon: '', title: '添加设备专用人员' },
        children: [
            {
                path: '/AddEquipment',
                name: 'AddEquipment',
                component: () => import('@/views/ManagerNewlyadded/AddEquipment'),
                meta: { icon: '', title: '添加设备专用人员' },
            }
        ]
    },
    {
        path: '/AddOther',
        component: Layout,
        hidden:true,
        meta: { icon: '', title: '其他类服务人员' },
        children: [
            {
                path: '/AddOther',
                name: 'AddOther',
                component: () => import('@/views/ManagerNewlyadded/AddOther'),
                meta: { icon: '', title: '其他类服务人员' },
            }
        ]
    },
    {
        path: '/AddAdministration',
        component: Layout,
        hidden:true,
        meta: { icon: '', title: '添加管理人员' },
        children: [
            {
                path: '/AddAdministration',
                name: 'AddAdministration',
                component: () => import('@/views/ManagerNewlyadded/AddAdministration'),
                meta: { icon: '', title: '添加管理人员' },
            }
        ]
    },
    //班组管理
    {
        path: '/team_message',
        component: Layout,
        // alwaysShow: true,
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
    // 花名册
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
    // 外来人员
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
    //  技术交底
    {
        path: '/trainEducation/skillDisclose',
        component: Layout,
        alwaysShow: true,
        meta: {
        title: '技术交底',
        icon: 'svg-droplet'
        },
        children: [
            {
                path: 'skillDisclose',
                name: 'skillDisclose',
                component: () => import('@/views/trainEducation/skillDisclose/skillDisclose'),
                meta: { title: '技术交底', icon: '' }
            }
        ]
    },
    //  安全技术交底
    {
        path: '/trainEducation/securitySkillDisclose',
        component: Layout,
        alwaysShow: true,
        meta: {
        title: '安全技术交底',
        icon: 'svg-droplet'
        },
        children: [
            {
                path: 'securitySkillDisclose',
                name: 'securitySkillDisclose',
                component: () => import('@/views/trainEducation/securitySkillDisclose/securitySkillDisclose'),
                meta: { title: '安全技术交底', icon: '' }
            }
        ]
    },
    //  视频库
    {
        path: '/trainEducation/videoLibrary',
        component: Layout,
        alwaysShow: true,
        meta: {
        title: '视频库',
        icon: 'svg-droplet'
        },
        children: [
            {
                path: 'videoLibrary',
                name: 'videoLibrary',
                component: () => import('@/views/trainEducation/videoLibrary/videoLibrary'),
                meta: { title: '视频库', icon: '' }
            }
        ]
    },
    //  试题库
    {
        path: '/trainEducation/questionsLibrary',
        component: Layout,
        alwaysShow: true,
        meta: {
        title: '试题库',
        icon: 'svg-droplet'
        },
        children: [
            {
                path: 'questionsLibrary',
                name: 'questionsLibrary',
                component: () => import('@/views/trainEducation/questionsLibrary/questionsLibrary'),
                meta: { title: '试题库', icon: '' }
            }
        ]
    },
    //  成绩统计
    {
        path: '/trainEducation/resultStatistics',
        component: Layout,
        alwaysShow: true,
        meta: {
        title: '成绩统计',
        icon: 'svg-droplet'
        },
        children: [
            {
                path: 'resultStatistics',
                name: 'resultStatistics',
                component: () => import('@/views/trainEducation/resultStatistics/resultStatistics'),
                meta: { title: '成绩统计', icon: '' }
            }
        ]
    },
    //  培训记录
    {
        path: '/trainEducation/trainRecord',
        component: Layout,
        alwaysShow: true,
        meta: {
        title: '培训记录',
        icon: 'svg-droplet'
        },
        children: [
            {
                path: 'dd',
                name: 'dd',
                component: () => import('@/views/trainEducation/resultStatistics/resultStatistics'),
                meta: { title: '线上培训记录', icon: '' }
            },
            {
                path: 'ss',
                name: 'ss',
                component: () => import('@/views/trainEducation/resultStatistics/resultStatistics'),
                meta: { title: '线下视频培训记录', icon: '' }
            }
        ]
    }
]
export default new Router({
  // mode: 'history',  require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = [

]
