import { post } from '../apiFun';

export const getHydrantList = params => post('getHydrantList', params);
export const getHydrantWeekTrendData = params => post('getHydrantWeekTrendData', params);
