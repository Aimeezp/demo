import { post } from '../apiFun';

export const getMsgList = params => post('getMsgList', params);// 获取烟感列表
export const msgInfoDispatch = params => post('msgInfoDispatch', params);
export const msgInfoConfirmOrCancel = params => post('msgInfoConfirmOrCancel', params);
