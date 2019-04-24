import { post } from '../apiFun';

export const getWeekNoiseState = params => post('getWeekNoiseState', params);// 获取一周噪音情况
export const getRealTimeNoise = params => post('getRealTimeNoise', params);// 获取实时噪音
export const getNoiseList = params => post('getNoiseList', params);// 噪音列表
