import Vue from 'vue'
import App from './App.vue'
// element-ui  :1、引入
import ElementUI from 'element-ui';

// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
// 全局注册组件
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
new Vue({

    render: h => h(App),
}).$mount('#app');