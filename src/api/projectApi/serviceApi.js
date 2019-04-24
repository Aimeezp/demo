import { post } from '../apiFun';

export const getTrapdoorState = params => post('getTrapdoorState', params);// 获取井盖状态
export const getWeekTrapdoorState = params => post('getWeekTrapdoorState', params);// 获取一周井盖状态
export const getWeekDustbinTrendData = params => post('getWeekDustbinTrendData', params);// 获取垃圾箱一周走势
export const getDustbinList = params => post('getDustbinList', params);// 垃圾箱列表
export const getTrapList = params => post('getTrapList', params);// 井盖列表
export const getMarchTrendData = params => post('getMarchTrendData', params);// 垃圾箱3月走势
