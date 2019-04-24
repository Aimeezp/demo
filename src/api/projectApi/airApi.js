import { post } from '../apiFun';

export const getAirList = params => post('getAirList', params);
export const getAirWeekTrendData = params => post('getAirWeekTrendData', params);
export const getAirMonthTrendData = params => post('getAirMonthTrendData', params);
export const getAirThermalPowerChart = params => post('getAirThermalPowerChart', params);
