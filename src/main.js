import Vue from 'vue'
import App from './App.vue'
// element-ui  :1、引入
import ElementUI from 'element-ui';

// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
// 引入vue-router
import VueRouter from 'vue-router';
// vue可以省略
import Login from './pages/Login.vue';
import Admin from './pages/Admin.vue';
// 全局注册组件
Vue.use(ElementUI);
// 注册插件
Vue.use(VueRouter);

var routes = [
    // 重定向
    { path: "/", redirect: '/admin' },
    {
        path: '/login',
        component: Login,
        meta: '登录页'
    }, { path: '/admin', component: Admin, meta: '首页' }
]

var router = new VueRouter({ routes });

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');