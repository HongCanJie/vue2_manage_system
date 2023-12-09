import Vue from 'vue'
import Vuex from 'vuex'
// 导入菜单模块
import Tab from './tab'
// 使用Vuex
Vue.use(Vuex);

// 创建并暴露store
export default new Vuex.Store({
    modules: {
        tab: Tab
    }
})


