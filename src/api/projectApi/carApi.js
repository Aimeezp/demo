import { post } from '../apiFun';

export const getCarInterList = params => post('getCarInterList', params);// 获取停车进场列表
export const getCarOuterList = params => post('getCarOuterList', params);// 获取停车离场列表
