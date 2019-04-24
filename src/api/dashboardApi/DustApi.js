import { post } from '../apiFun';

export const getDashboardDust = params => post('dustData', params);// 扬尘模块
