import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import mainPage from './modules/mainPage';
import dashboard from './modules/dashboard';
import workOrderManage from './modules/workOrderManage';
import deviceLogDetail from './modules/deviceLogDetail';
import smoke from './modules/smoke';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    mainPage,
    dashboard,
    workOrderManage,
    deviceLogDetail,
    smoke,
  },
});

export default store;
