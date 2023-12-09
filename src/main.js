// 引入Vue文件
import Vue from 'vue'
// 引入ElementUI组件
import ElementUI from 'element-ui';
// 引入ElementUI样式
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
// 引入router
import Router from './router/index'
// 导入store配置
import Store from './store/index'
// 引入mock配置
import './api/mock'
// 引入cookie文件
import Cookie from 'js-cookie'

// 关闭生产提示
Vue.config.productionTip = false;
// 使用ElementUI
Vue.use(ElementUI);

// 全局路由守卫
Router.beforeEach((to, from, next) => {
  // 获取当前cookie值
  const token = Cookie.get('token');
  // 判断是否有token值
  if (!token && to.path !== '/login') {
    // 如果没有token值且下一步跳转的不是登录页则跳回登录页面
    next('/login')
  } else if (token && to.path === '/login') {
    // 如果有token值且下一步跳转的是登录页则跳回首页
    next('/')
  } else {
    next();
  }
})

new Vue({
  router: Router,
  store: Store,
  // 由于页面刷新时vm实例会初始化，login组件中的逻辑没有执行，因此没有获取菜单列表，所以需要在vm实例创建后重新获取菜单数据
  created() {
    Store.commit('addMenu', Router);
  },
  render: h => h(App)
}).$mount('#app')
