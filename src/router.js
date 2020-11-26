import Vue from 'vue'	//引入vue
import Router from 'vue-router'
Vue.use(Router)
//登录
import Login from '@/pages/login/login.vue'

import Home from '@/pages/home/index.vue'
//任务中心
// 企业任务管理
import RenwuMessage from '@/pages/renwu/renwuMessage.vue'
// 平台发包管理
import FabaoMessage from '@/pages/renwu/fabaoMessage.vue'
// 投递人员信息
import RenyuanMessage from '@/pages/renwu/renyuanMessage.vue'
// 签约
import Signing from '@/pages/contract/signing.vue'
// 发布
import RepairOrder from '@/pages/trading/repairOrder.vue'
// 签约
import Trading from '@/pages/trading/trading.vue'
// 用户中心
//用户管理
import Usermessage from '@/pages/userInfo/usermessage.vue'
//实名认证管理
import ShimingRen from '@/pages/userInfo/shimingRen.vue'
//企业认证管理
import QiyeRen from '@/pages/userInfo/qiyeRen.vue'

export default new Router({
  routes: [
  //   { 
  //    path: '/',
  //    name: 'home', 
  //    meta: {
  //     requireAuth: true // 配置此条，进入页面前判断是否需要登陆
  //   },
  //   component: Home 
  //  },
    { 
      path: '/renwu/renwuMessage',  
      meta: {
      requireAuth: true // 配置此条，进入页面前判断是否需要登陆
    },
     name: 'renwuMessage',
     component: RenwuMessage
     },
    { 
      path: '/renwu/fabaoMessage',  
      meta: {
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆
     },
     name: 'fabaoMessage',
     component: FabaoMessage 
    },
    { 
      path: '/renwu/renyuanMessage', 
      meta: {
      requireAuth: true // 配置此条，进入页面前判断是否需要登陆
    },
      name: 'renyuanMessage', 
      component: RenyuanMessage 
    },
    { 
      path: '/',  
      meta: {
      requireAuth: true // 配置此条，进入页面前判断是否需要登陆
    },
    name: 'usermessage', 
    component: Usermessage 
   },
    { 
      path: '/userInfo/shimingRen',  
      meta: {
      requireAuth: true // 配置此条，进入页面前判断是否需要登陆
    }, 
    name: 'shimingRen', 
     meta: {
      requireAuth: true // 配置此条，进入页面前判断是否需要登陆
    }, 
    component: ShimingRen 
   },
    {
       path: '/userInfo/qiyeRen',  
       meta: {
       requireAuth: true // 配置此条，进入页面前判断是否需要登陆
    },
      name: 'qiyeRen', 
      component: QiyeRen
     },
    { 
      path: '/contract/signing',   
      meta: {
      requireAuth: true // 配置此条，进入页面前判断是否需要登陆
    },
      name: 'signing', 
      component: Signing
     },
    {
       path: '/trading/repairOrder',  
       meta: {
      requireAuth: true // 配置此条，进入页面前判断是否需要登陆
    }, 
    name: 'repairOrder', 
    component: RepairOrder 
  },
    { 
      path: '/trading/trading',  
      meta: {
      requireAuth: true // 配置此条，进入页面前判断是否需要登陆
    }, 
    name: 'trading', 
    component: Trading
   },
    { path: '/login',
      name: 'Login',
      component: Login},
  ]
})

// Redirected when going from “/xxx” to “/yyy” via a navigation guard. 处理路由守卫重定向报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}