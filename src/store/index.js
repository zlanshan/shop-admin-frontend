// 整个应用都能调用的仓库数据
import Vuex from 'vuex';
import Vue from 'vue';

import user from './modules/user';
// 关联项目要用到注册插件的方式
Vue.use(Vuex);
// 创建仓库
export default new Vuex.Store({
    modules: {
        user
    }
})