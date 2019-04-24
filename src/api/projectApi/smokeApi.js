import { post } from '../apiFun';

export const getSmokeList = params => post('getSmokeList', params);// 获取烟感列表
