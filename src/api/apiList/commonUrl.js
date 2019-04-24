import { commonIp } from '@/config/baseIp';

const base = `http://${commonIp}/unicom-iot`;

export default {
  login: `${base}/auth/token/user`, // 登陆
  dashboardList: '/dashboard/dashboardList', // 获取dashboard的列表
  dashboardSave: '/dashboard/dashboardSave', // 保存dashboard的数据
};
