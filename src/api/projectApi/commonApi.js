import { post, postJson } from '../apiFun';

export const requestLogin = params => post('login', params);// 登录
export const getDashboardList = params => post('dashboardList', params);// 获取dashboard的列表
export const dashboardSave = params => postJson('dashboardSave', params);// 保存dashboard的数据
