import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './assets/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css';
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.prototype.$cookies = VueCookies;

let url = '';
if (process.env.NODE_ENV === "development") {
  console.log("开发环境")
  url = null
}else {
  console.log("生产环境")
  url = 'gongsibao.com'
}
// 配置失效时间，路径，域名
VueCookies.config('1d', '/', url)

import {
  auditTransform,
  invoiceTransform,
  personAuthResult,
  sexAuthResult,
  staskStatusResult,
  taskStatustForm,
  signStatusForm,
  applyStatusForm,
  xueliStatusForm

} from './filters/textTransform.js';

Vue.filter('audit', auditTransform);
Vue.filter('invoice', invoiceTransform);
Vue.filter('authresult', personAuthResult);
Vue.filter('sexresut', sexAuthResult);
Vue.filter('staskresult', staskStatusResult);
Vue.filter('taskstatus', taskStatustForm);
Vue.filter('signstatus', signStatusForm);
Vue.filter('applystatus', applyStatusForm);
Vue.filter('xuelistatus', xueliStatusForm);

//全局修改默认配置
ElementUI.Dialog.props.closeOnClickModal.default=false;
console.info(ElementUI.Dialog);
import {
  message
} from './util/resetMessage';
Vue.use(ElementUI)
Vue.prototype.$message = message;
Vue.config.productionTip = false

let routerName = null;

router.beforeEach((to, from, next) => {
  console.log(to,from, router,'路由首位')
  if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆
    console.log(VueCookies.isKey('esignplatformsid'),'检查登录状态是否存在')
    if (VueCookies.isKey('esignplatformsid')) { // 查询本地存储信息是否已经登陆
      routerName = '登录已失效，请重新登录'
      next()
    } else {
      console.log(from, '跳转登录1');
      if (routerName) {
        message.warning(routerName)
      }
      return next({
        path: '/login' // 未登录则跳转至login页面
        // query: {redirect: to.fullPath} // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面
      }) // 否则全部重定向到登录页
    }
  } else {
    let type =  router.options.routes.some(item => {
        return item.path === to.path
    })
    if (type) {
      next()
    }else {
      console.log(from, '跳转登录2');
      next({
        path: '/login' // 未登录则跳转至login页面
      })
    }
  }
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
