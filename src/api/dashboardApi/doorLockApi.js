import { post } from '../apiFun';

export const getDashboardDoorLock = params => post('getDashboardDoorLock', params);// 获取门磁大小模块数据
