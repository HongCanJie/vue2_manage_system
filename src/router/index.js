import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由组件
import Main from '../views/Main'
import Home from '../views/Home'
import User from '../views/User'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
import Login from '../views/Login'

// 创建并暴露路由配置
export default new VueRouter({
    routes: [
        {
            // 主路由
            path: '/',
            name: 'Main',
            component: Main,
            redirect: '/home',//重定向（这样打开会自动跳转到home）
            // 子路由
            // children: [
            //     {
            //         name: 'home',
            //         path: '/home',
            //         component: Home//首页
            //     }, {
            //         name: 'user',
            //         path: '/user',
            //         component: User//用户管理
            //     }, {
            //         name: 'mall',
            //         path: '/mall',
            //         component: Mall//商品管理
            //     }, {
            //         name: 'page1',
            //         path: '/page1',
            //         component: PageOne//页面1
            //     }, {
            //         name: 'page2',
            //         path: '/page2',
            //         component: PageTwo//页面2
            //     }
            // ],
        },
        {
            path: '/login',
            name: 'login',
            component: Login//登录
        }
    ]
})

Vue.use(VueRouter);