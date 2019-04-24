import { post, postImgHelp } from '../apiFun';

export const getworkOrderList = params => post('getworkOrderList', params);// 获取工单列表
export const getImgUrl = params => postImgHelp('getImgUrl', params);// 获取图片
