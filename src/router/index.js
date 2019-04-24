import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('../views/Home');
const WorkOrderManage = () => import('../views/WorkOrderManage');
const DashboardEdit = () => import('../views/DashboardEdit');

const MsgManage = () => import('../views/MsgManage');
const DeviceManage = () => import('../views/DeviceManage');
const AboutUniconnect = () => import('../views/AboutUniconnect');

Vue.use(Router);
const routes = [{
  path: '/',
  redirect: '/main-page',
  component: Home,
  children: [{
    path: '/main-page',
    component: () => import('../views/MainPage'),
  }],
},
{
  path: '/work-order-manage',
  component: WorkOrderManage,
},
// 演示面板
{
  path: '/DashboardEdit',
  component: DashboardEdit,
},
{
  path: '/msg-manage',
  component: MsgManage,
},
{
  path: '/device-manage',
  component: DeviceManage,
},
{
  path: '/about-uniconnect',
  component: AboutUniconnect,
},
{
  path: '/404',
  component: () => import('../views/404'),
},
{
  path: '*',
  redirect: {
    path: '/404',
  },
},
];


// 页面跳转后滚动到页面顶部
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }
  const position = {};
  if (to.hash) {
    position.selector = to.hash;
  } else {
    position.x = 0;
    position.y = 0;
  }
  return position;
};

const router = new Router({
  routes,
  scrollBehavior,
});

export default router;
