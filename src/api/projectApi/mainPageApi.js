import { post } from '../apiFun';

export const getDevices = params => post('getDevices', params);// 获取所有设备列表
export const videoMonitorStopFun = params => post('videoMonitorStop', params);
