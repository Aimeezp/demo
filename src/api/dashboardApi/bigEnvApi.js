import { post } from '../apiFun';

export const getDashboardBigEnv = params => post('getDashboardBigEnv', params);// 获取环境监测大模块数据
