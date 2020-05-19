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
    {
        path: '/forgetPassword',
        name: 'forgetPassword',
        component: () => import('@/views/register/forgetPassword')
    },
    //点击进入首页
    {
        path: '/Selectpage',
        name: 'Selectpage',
        component: () => import('@/views/Selectpage/Selectpage')
    },
     //大屏
     {
        path: '/Statisticsscreen',
        name: 'Statisticsscreen',
        component: () => import('@/views/Statisticsscreen/Statisticsscreen')
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
        name: '实名认证',
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/homepage'),
                meta: { title: '人员智慧管理系统', enable: "Y", parent: '实名认证' }
            }
        ]
    },
    // 首页
    {
        path: '/homeShow',
        component: Layout,
        alwaysShow: true,
        name: "首页",
        meta: {
            icon: 'question',
            title: '首页',
            enable: "Y",
            parent: '首页'
        },
        redirect: '/homeShow',
        children: [
            {
                path: '/homeShow',
                alwaysShow: true,
                name: 'homeShow',
                component: () => import('@/views/homeShow/homeShow'),
                meta: { icon: 'droplet', title: '首页', enable: "Y", parent: '首页' },
                children: []
            }
        ]
    },
    {
        path: '/labor_Subcontract1',
        name: '实名认证',
        // hidden: true,

        component: Layout,
        meta: {
            icon: '',
            title: '实名认证',
            enable: "Y",

        },
        redirect: 'labor_Subcontract1',
        children: [
            {

                path: '/labor_Subcontract1',
                component: () =>
                    import('@/views/labor_Subcontract/index'),
                // alwaysShow: false,
                meta: {
                    icon: '../../static/image/laowu.png',
                    AfterIcon: '../../static/image/Team.png',
                    title: '劳务公司管理',
                    enable: "Y",
                    parent: '实名认证',
                },
                // // redirect: 'labor_Subcontract1',
                children: []
            },
            //班组管理
            {
                path: '/team_message',
                component: () =>
                    import('@/views/team_message/index'),

                // alwaysShow: true,
                meta: {
                    title: '班组管理',
                    icon: '../../static/image/Team.png',
                    enable: "Y",
                    parent: '实名认证'
                },
                children: [{
                    path: '/team_message/message',
                    name: 'message',
                    component: () =>
                        import('@/views/team_message/message'),
                    meta: { title: '班前信息', icon: '', enable: "Y", parent: '实名认证' }
                },
                {
                    path: '/team_message/talkrecord',
                    name: 'talkrecord',
                    component: () =>
                        import('@/views/team_message/talkrecord'),
                    meta: { title: '班前讲话记录', icon: '', enable: "Y", parent: '实名认证' }
                }
                ]
            },
            // 花名册
            {
                path: '/roster',
                component: () =>
                    import('@/views/roster/index'),
                // alwaysShow: true,
                meta: {
                    title: '花名册',
                    icon: '../../static/image/roster.png',
                    enable: "Y",
                    parent: '实名认证'
                },
                // redirect: '/roster/manager',
                children: [{
                    path: '/roster/manager',
                    name: 'manager',
                    component: () =>
                        import('@/views/roster/manager'),
                    meta: { title: '管理人员', icon: '', enable: "Y", parent: '实名认证' }
                },
                {
                    path: '/roster/personnel',
                    name: 'personnel',
                    component: () =>
                        import('@/views/roster/personnel'),
                    meta: { title: '劳务人员', icon: '', enable: "Y", parent: '实名认证' }
                },
                {
                    path: '/roster/equipmentSpecialist',
                    name: 'equipmentSpecialist',
                    component: () =>
                        import('@/views/roster/equipmentSpecialist'),
                    meta: { title: '设备专用人员', icon: '', enable: "Y", parent: '实名认证' }
                },
                {
                    path: '/roster/otherStaffs',
                    name: 'otherStaffs',
                    component: () =>
                        import('@/views/roster/otherStaffs'),
                    meta: { title: '其他服务类人员', icon: '', enable: "Y", parent: '实名认证' }
                }
                ]
            },
            // 外来人员
            {
                path: '/foreignpersonnel/index',
                name: 'CustomComponent',
                // alwaysShow: true,
                component: () =>
                    import('@/views/foreignpersonnel/index'),
                meta: {
                    icon: '../../static/image/sidebar_icon/Unchecked_Outlander.png',
                    AfterIcon: '../../static/image/wlry.png',
                    title: '外来人员',
                    enable: "Y",
                    parent: '实名认证'
                },
                children: []
            },
        ]
    },
    {
        path: '/wisdomAttendance',
        name: '智慧考勤',
        component: Layout,
        meta: {
            icon: '',
            title: '智慧考勤',
            enable: "Y",
            parent: '智慧考勤'
        },
        redirect: '/wisdomAttendance/comeRecord/manager',
        children: [
            {
                path: '/wisdomAttendance/comeRecord/index',
                component: () =>
                    import('@/views/wisdomAttendance/comeRecord/index'),
                meta: {
                    title: '出入记录',
                    icon: '../../static/image/attendanceRecord.png',
                    AfterIcon: '../../static/image/attendanceRecord.png',
                    enable: "Y",
                    parent: '智慧考勤',
                },
                children: [{
                    path: '/wisdomAttendance/comeRecord/manager',
                    name: 'manager',
                    component: () =>
                        import('@/views/wisdomAttendance/comeRecord/manager'),
                    meta: { title: '管理人员', icon: '', enable: "Y", parent: '智慧考勤' },
                    children: []
                },
                {
                    path: '/wisdomAttendance/comeRecord/personnel',
                    name: 'personnel',
                    component: () =>
                        import('@/views/wisdomAttendance/comeRecord/personnel'),
                    meta: { title: '劳务人员', icon: '', enable: "Y", parent: '智慧考勤' },
                    children: []
                },
                {
                    path: '/wisdomAttendance/comeRecord/otherStaffs',
                    name: 'otherStaffs',
                    component: () =>
                        import('@/views/wisdomAttendance/comeRecord/otherStaffs'),
                    meta: { title: '其他服务类人员', icon: '', enable: "Y", parent: '智慧考勤' },
                    children: []
                },
                {
                    path: '/wisdomAttendance/comeRecord/equipmentSpecialist',
                    name: 'equipmentSpecialist',
                    component: () =>
                        import('@/views/wisdomAttendance/comeRecord/equipmentSpecialist'),
                    meta: { title: '设备专用人员', icon: '', enable: "Y", parent: '智慧考勤' },
                    children: []
                },
                {
                    path: '/wisdomAttendance/comeRecord/foreign',
                    name: 'foreign',
                    component: () =>
                        import('@/views/wisdomAttendance/comeRecord/foreign'),
                    meta: { title: '外来人员', icon: '', enable: "Y", parent: '智慧考勤' },
                    children: []
                }
                ]
            },
            {
                path: '/wisdomAttendance/attendanceRecord',

                component: () => import('@/views/wisdomAttendance/attendanceRecord/index'),
                // alwaysShow: true,
                meta: {
                    title: '出勤记录',
                    icon: '../../static/image/sidebar_icon/Unchecked_Access.png',
                    AfterIcon: '../../static/image/sidebar_icon/Unchecked_Access.png',
                    enable: "Y",
                    parent: '智慧考勤'
                },
                children: [
                    {
                        path: '/wisdomAttendance/attendanceRecord/manager',
                        name: 'manager',
                        component: () => import('@/views/wisdomAttendance/attendanceRecord/manager'),
                        meta: { title: '管理人员', icon: '', enable: "Y", parent: '智慧考勤' }
                        // meta: { title: '班前讲话记录', icon: '', enable: "Y", parent: '实名认证' }
                    },
                    {
                        path: '/wisdomAttendance/attendanceRecord/personnel',
                        name: 'personnel',
                        component: () => import('@/views/wisdomAttendance/attendanceRecord/personnel'),
                        meta: { title: '劳务人员', icon: '', enable: "Y", parent: '智慧考勤' }
                    },

                    {
                        path: '/wisdomAttendance/attendanceRecord/equipmentSpecialist',
                        name: 'equipmentSpecialist',
                        component: () => import('@/views/wisdomAttendance/attendanceRecord/equipmentSpecialist'),
                        meta: { title: '设备专用人员', icon: '', enable: "Y", parent: '智慧考勤' }
                    },
                    {
                        path: '/wisdomAttendance/attendanceRecord/otherStaffs',
                        name: 'otherStaffs',
                        component: () => import('@/views/wisdomAttendance/attendanceRecord/otherStaffs'),
                        meta: { title: '其他服务类人员', icon: '', enable: "Y", parent: '智慧考勤' }
                    }
                ]
            },
            {
                path: '/thereport',
                component: () => import('@/views/wisdomAttendance/thereport/index'),
                meta: {

                    icon: '../../static/image/attendanceReport.png',
                    AfterIcon: '../../static/image/attendanceReport.png',
                    title: '考勤报表',
                    enable: "Y",
                    parent: '智慧考勤'
                },
                children: [
                    {
                        path: '/menu1',
                        meta: {
                            // icon: '../../static/image/attendanceReport.png',
                            // AfterIcon: '../../static/image/attendanceReport.png',
                            title: '详细信息',
                            enable: "Y",
                            parent: '智慧考勤'
                        },

                        component: () => import('@/views/nested/menu1/index'),
                        children: [
                            {
                                path: '/menu1-1',
                                name: 'menu1-1',
                                component: () => import('@/views/wisdomAttendance/thereport/personnel'),
                                meta: { title: '劳务人员', icon: '', enable: "Y", parent: '智慧考勤' }
                            },
                            {
                                path: '/manager',
                                name: 'manager',
                                component: () => import('@/views/wisdomAttendance/thereport/manager'),
                                meta: { title: '管理人员', icon: '', enable: "Y", parent: '智慧考勤' }
                            },
                            {
                                path: '/equipmentSpecialist',
                                name: 'equipmentSpecialist',
                                component: () => import('@/views/wisdomAttendance/thereport/equipmentSpecialist'),
                                meta: { title: '设备专用人员', icon: '', enable: "Y", parent: '智慧考勤' }
                            },
                            {
                                path: '/otherStaffs',
                                name: 'otherStaffs',
                                component: () => import('@/views/wisdomAttendance/thereport/otherStaffs'),
                                meta: { title: '其他服务类人员', icon: '', enable: "Y", parent: '智慧考勤' }
                            }
                        ]
                    },
                    {
                        path: '/foreign',
                        name: 'foreign',
                        component: () => import('@/views/wisdomAttendance/thereport/foreign'),
                        meta: { icon: 'star-on', title: '统计分析', enable: "Y", parent: '智慧考勤' }
                    }
                ]
            },

        ]
    },
    {
        path: '/trainEducation',
        name: '培训教育',
        component: Layout,
        meta: {
            icon: '',
            title: '培训教育',
            enable: "Y",
            parent: '培训教育'
        },
        redirect: '/skillDisclose',
        children: [
            {
                path: '/skillDisclose',
                // name: 'skillDisclose',
                component: () => import('@/views/trainEducation/skillDisclose/skillDisclose'),
                meta: {
                    title: '技术交底',
                    icon: '../../static/image/technology.png',
                    AfterIcon: '../../static/image/technology.png',
                    enable: "Y",
                    parent: '培训教育'
                },
                children: []
            },
            {
                path: '/securitySkillDisclose',
                name: 'securitySkillDisclose',
                component: () => import('@/views/trainEducation/securitySkillDisclose/securitySkillDisclose'),
                meta: {
                    title: '安全技术交底',
                    icon: '../../static/image/security.png',
                    AfterIcon: '../../static/image/security.png',
                    enable: "Y",
                    parent: '培训教育'
                },
                children: []
            },
            {
                path: '/videoLibrary',
                name: 'videoLibrary',
                component: () => import('@/views/trainEducation/videoLibrary/videoLibrary'),
                meta: {
                    title: '视频库',
                    icon: '../../static/image/Video.png',
                    AfterIcon: '../../static/image/Video.png',
                    enable: "Y",
                    parent: '培训教育'
                },
                children: []
            },
            {
                path: '/questionsLibrary',
                name: 'questionsLibrary',
                component: () => import('@/views/trainEducation/questionsLibrary/questionsLibrary'),
                meta: {
                    title: '试题库',
                    icon: '../../static/image/testQuestions.png',
                    AfterIcon: '../../static/image/testQuestions.png',
                    enable: "Y",
                    parent: '培训教育'
                },
                children: []
            },
            {
                path: '/resultStatistics',
                name: 'resultStatistics',
                component: () => import('@/views/trainEducation/resultStatistics/index'),
                meta: {
                    title: '成绩统计',
                    icon: '../../static/image/beforeAchievement.png',
                    AfterIcon: '../../static/image/Achievement.png',
                    enable: "Y",
                    parent: '培训教育'
                },
                children: [
                    {
                        path: '/resultAnalysis',
                        name: 'resultAnalysis',
                        component: () => import('@/views/trainEducation/resultStatistics/resultAnalysis/resultAnalysis'),
                        meta: { title: '统计分析', icon: '', enable: "Y", parent: '培训教育' },
                    },
                    {
                        path: '/resultDetailed',
                        name: 'resultDetailed',
                        component: () => import('@/views/trainEducation/resultStatistics/resultDetailed/resultDetailed'),
                        meta: { title: '详细信息', icon: '', enable: "Y", parent: '培训教育' },
                    }
                ]
            },
            {
                path: '/trainEducation/trainRecord',
                // component: Layout,
                component: () => import('@/views/trainEducation/trainRecord/index'),
                alwaysShow: true,
                meta: {
                    title: '培训记录',
                    icon: '../../static/image/peixun1.png',
                    AfterIcon: '../../static/image/peixun1.png',
                    enable: "Y",
                    parent: '培训教育'
                },
                children: [
                    {
                        path: '/lineUpperTrain',
                        name: 'lineUpperTrain',
                        component: () => import('@/views/trainEducation/trainRecord/lineUpperTrain/lineUpperTrain'),
                        meta: { title: '线上培训记录', icon: '', enable: "Y", parent: '培训教育' }
                    },
                    {
                        path: '/lineLowerTrain',
                        name: 'lineLowerTrain',
                        component: () => import('@/views/trainEducation/trainRecord/lineLowerTrain/lineLowerTrain'),
                        meta: { title: '线下视频培训记录', icon: '', enable: "Y", parent: '培训教育' }
                    }
                ]
            }

        ]
    },
    {
        path: '/integrityManagement',
        name: '诚信管理',
        component: Layout,
        meta: {
            icon: '',
            title: '诚信管理',
            enable: "Y",
            parent: '诚信管理'
        },
        redirect: '/personageEvaluate',
        children: [
            {
                path: '/personnelEvaluate',
                component: () => import('@/views/integrityManagement/index'),
                alwaysShow: true,
                meta: {
                    title: '人员评价',
                    icon: '../../static/image/pingjia.png',
                    AfterIcon: '../../static/image/pingjia.png',
                    enable: "Y",
                    parent: '诚信管理'
                },
                children: [
                    {
                        path: '/personageEvaluate',
                        name: 'personageEvaluate',
                        component: () => import('@/views/integrityManagement/personnelEvaluate/personageEvaluate'),
                        meta: { title: '个人评价', icon: '', enable: "Y", parent: '诚信管理' }
                    },
                    {
                        path: '/teamEvaluate',
                        name: 'teamEvaluate',
                        component: () => import('@/views/integrityManagement/personnelEvaluate/teamEvaluate'),
                        meta: { title: '班组评价', icon: '', enable: "Y", parent: '诚信管理' }
                    }
                ]
            },
            {
                path: '/blacklist',
                component: () => import('@/views/integrityManagement/blacklist/blacklist'),
                meta: {
                    icon: '../../static/image/blacklist.png',
                    AfterIcon: '../../static/image/blacklist.png',
                    title: '黑名单',
                    enable: "Y",
                    parent: '诚信管理'
                },
                children: []
            },
        ]
    },
    {
        path: '/positioning',
        name: '人员定位',
        component: Layout,
        meta: {
            icon: '',
            title: '人员定位',
            enable: "Y",
            parent: '人员定位'
        },
        children: [
            {
                path: '/personnelEvaluate',
                component: () => import('@/views/integrityManagement/index'),
                alwaysShow: true,
                meta: {
                    title: '劳务公司管理',
                    icon: '../../static/image/blacklist.png',
                    AfterIcon: '../../static/image/blacklist.png',
                    enable: "Y",
                    parent: '人员定位'
                },
                children: [
                    {
                        path: '/Positioningof',
                        name: 'Positioningof',
                        component: () => import('@/views/positioning/Positioningof/Positioningof'),
                        meta: { title: '劳务公司二组', icon: '', enable: "Y", parent: '人员定位' },
                        children: []
                    }
                ]
            },
        ]
    },
    {
        path: '/testTemperature',
        name: '人员测温',
        component: Layout,
        meta: {
            icon: '',
            title: '人员测温',
            enable: "Y",
            parent: '人员测温'
        },
        redirect: '/realTimePreview',
        children: [
            {
                path: '/realTimePreview',
                name: '/realTimePreview',
                component: () => import('@/views/testTemperature/realTimePreview/realTimePreview'),
                meta: {
                    title: '实时预览',
                    icon: '../../static/image/yulan.png',
                    AfterIcon: '../../static/image/yulan.png',
                    enable: "Y",
                    parent: '人员测温'
                },
                children: []
            },
            {
                path: '/testTemperature/warningEvent',
                component: () => import('@/views/testTemperature/index'),
                alwaysShow: true,
                meta: {
                    title: '预警事件',
                    icon: '../../static/image/yujing.png',
                    AfterIcon: '../../static/image/yujing.png',
                    enable: "Y",
                    arent: '人员测温'
                },
                children: [
                    {
                        path: '/highTemperature',
                        name: 'highTemperature',
                        component: () => import('@/views/testTemperature/warningEvent/highTemperature/highTemperature'),
                        meta: { title: '高温预警', icon: '', enable: "Y", parent: '人员测温' },
                        children: []
                    },
                    {
                        path: '/notWearMask',
                        name: 'notWearMask',
                        component: () => import('@/views/testTemperature/warningEvent/notWearMask/notWearMask'),
                        meta: { title: '未佩戴口罩', icon: '', enable: "Y", parent: '人员测温' },
                        children: []
                    }
                ]
            },
        ]
    },

    // 工友须知
    {
        path: '/workmateNotice',
        component: Layout,
        alwaysShow: true,
        name: "工友须知",
        meta: {
            icon: 'question',
            title: '工友须知',
            enable: "Y",
            parent: '工友须知'
        },
        redirect: '/workmateNotice',
        children: [
            {
                path: '/workmateNotice',
                alwaysShow: true,
                name: 'workmateNotice',
                component: () => import('@/views/WorkmateNotice/workmateNotice'),
                meta: { icon: 'droplet', title: '工友须知', enable: "Y", parent: '工友须知' },
                children: []
            }
        ]
    },

    // ManagerNewlyadded 花名册管理人员新增 PersonnelNewlyadded
    {
        path: '/LabourNewlyadded',
        component: Layout,
        hidden: true,
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
        hidden: true,
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
        hidden: true,
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
        hidden: true,
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
    //疫情管理
    {
        path: '/sicknessManage',
        name: '疫情管理',
        component: Layout,
        meta: {
            icon: '',
            title: '疫情管理',
            enable: "Y",
            parent: '疫情管理'
        },
        redirect: '/sourceStatistics',
        children: [
            {
                path: '/sourceStatistics',
                name: 'sourceStatistics',
                component: () => import('@/views/sicknessManage/sourceStatistics/sourceStatistics'),
                meta: {
                    title: '来源地统计',
                    icon: '../../static/image/technology.png',
                    AfterIcon: '../../static/image/technology.png',
                    enable: "Y",
                    parent: '疫情管理'
                },
                children: []
            },
            {
                path: '/plan',
                name: 'plan',
                component: () => import('@/views/sicknessManage/plan/plan'),
                meta: {
                    title: '计划',
                    icon: '../../static/image/security.png',
                    AfterIcon: '../../static/image/security.png',
                    enable: "Y",
                    parent: '疫情管理'
                },
                children: []
            }
        ]
    },
       // 开复工
       {
        path: '/backWork',
        component: Layout,
        alwaysShow: true,
        name: "开复工管理",
        meta: {
            icon: 'question',
            title: '开复工管理',
            enable: "Y",
            parent: '开复工管理'
        },
        redirect: '/backwork',
        children: [
            {
                path: '/backwork',
                alwaysShow: true,
                name: 'backwork',
                component: () => import('@/views/backWork/backwork'),
                meta: { icon: 'droplet', title: '开复工管理', enable: "Y", parent: '开复工管理' },
                children: []
            }
        ]
    },


  //工地管理
    {
      path: '/constructionsiteManager',
      name: '工地管理',
      component: Layout,
      meta: {
          icon: '',
          title: '工地管理',
          enable: "Y",
          parent: '工地管理'
      },
      redirect: '/constructionsiteManager',
      children: [
        {
          path: '/constructionsiteManager',
          name: 'constructionsiteManager',
          component: () => import('@/views/systemManager/constructionsiteManager/constructionsiteManager'),
          meta: {
              title: '工地管理',
              enable: "Y",
              parent: '工地管理'
          },
          children: []
      },
      ]
  },

   //角色管理
   {
    path: '/roleManager',
    name: '角色管理',
    component: Layout,
    meta: {
        icon: '',
        title: '角色管理',
        enable: "Y",
        parent: '角色管理'
    },
    redirect: '/roleManager',
    children: [
      {
        path: '/roleManager',
        name: 'roleManager',
        component: () => import('@/views/systemManager/roleManager/roleManager'),
        meta: {
            title: '角色管理',
            enable: "Y",
            parent: '角色管理'
        },
        children: []
    },
    ]
},

//用户管理
{
  path: '/userManager',
  name: '用户管理',
  component: Layout,
  meta: {
      icon: '',
      title: '用户管理',
      enable: "Y",
      parent: '用户管理'
  },
  redirect: '/userManager',
  children: [
    {
      path: '/userManager',
      name: 'userManager',
      component: () => import('@/views/systemManager/userManager/userManager'),
      meta: {
          title: '用户管理',
          enable: "Y",
          parent: '用户管理'
      },
      children: []
  },
  ]
},





  //   {
  //     path: '/systemManager',
  //     name: '系统管理',
  //     component: Layout,
  //     meta: {
  //         icon: '',
  //         title: '系统管理',
  //         enable: "Y",
  //         parent: '系统管理'
  //     },
  //     redirect: '/userManager',
  //     children: [
  //         {
  //             path: '/userManager',
  //             // name: 'skillDisclose',
  //             component: () => import('@/views/systemManager/userManager/userManager'),
  //             meta: {
  //                 title: '用户管理',
  //                 icon: '../../static/image/technology.png',
  //                 AfterIcon: '../../static/image/technology.png',
  //                 enable: "Y",
  //                 parent: '系统管理'
  //             },
  //             children: []
  //         },
  //         {
  //             path: '/roleManager',
  //             name: 'roleManager',
  //             component: () => import('@/views/systemManager/roleManager/roleManager'),
  //             meta: {
  //                 title: '角色管理',
  //                 icon: '../../static/image/security.png',
  //                 AfterIcon: '../../static/image/security.png',
  //                 enable: "Y",
  //                 parent: '系统管理'
  //             },
  //             children: []
  //         },
  //         {
  //             path: '/constructionsiteManager',
  //             name: 'constructionsiteManager',
  //             component: () => import('@/views/systemManager/constructionsiteManager/constructionsiteManager'),
  //             meta: {
  //                 title: '工地管理',
  //                 icon: '../../static/image/Video.png',
  //                 AfterIcon: '../../static/image/Video.png',
  //                 enable: "Y",
  //                 parent: '系统管理'
  //             },
  //             children: []
  //         }
  //     ]
  // }
]
export default new Router({
    // mode: 'history',  require service support
    // scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})
export const asyncRouterMap = [

]
