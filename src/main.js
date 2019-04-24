// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';
import BaiduMap from 'vue-baidu-map';
import NProgress from 'nprogress';
import './assets/styles/iconfont/iconfont.css';
import App from './App';
import router from './router';
import store from './store';
import './api';
import './mock';
import 'nprogress/nprogress.css';

Vue.prototype.$echarts = echarts;

Vue.use(BaiduMap, {
  ak: 'lf8Y9YtAkmBcCHbKofIZgPg1Ax7Gb2qB', // 联城demo
});

Vue.use(ElementUI);

Vue.config.productionTip = false;

NProgress.configure({ showSpinner: false });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
