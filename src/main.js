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
import Goodslist from './pages/goods/GoodsList.vue';
import Categorylist from './pages/category/CategoryList.vue';
import Accountlist from './pages/accountlist/AccountList.vue';
import Orderlist from './pages/orderlist/OrderList.vue';
import Goodsadd from './pages/goods/GoodsAdd.vue';
import Goodsedit from './pages/goods/GoodsEdit.vue';
import Orderedit from './pages/orderlist/OrderEdit.vue';
import Orderdetail from './pages/orderlist/OrderDetail.vue';
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
    }, {
        path: '/admin',
        component: Admin,
        meta: '管理后台',
        children: [{ path: 'goodslist', component: Goodslist, meta: '商城管理' },
            { path: 'goodsadd', component: Goodsadd, meta: '添加商品' },
            { path: 'goodsedit', component: Goodsedit, meta: '编辑商品' },

            { path: 'categorylist', component: Categorylist, meta: '栏目管理' },
            { path: 'accountlist', component: Accountlist, meta: '会员列表' },
            { path: 'orderlist', component: Orderlist, meta: '订单管理' },
            { path: 'orderedit/:id', component: Orderedit, meta: '编辑订单' },
            { path: 'orderdetail/:id', component: Orderdetail, meta: '订单详情' }

        ]
    }
]

var router = new VueRouter({ routes });
// Vue.config.productionTip = false

axios.defaults.baseURL = "http://127.0.0.1:8899";

Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');