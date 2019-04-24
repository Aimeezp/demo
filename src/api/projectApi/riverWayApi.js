import { post } from '../apiFun';

export const getRiverWayTable = params => post('getRiverWayTable', params);
export const getRiverWayWeekOpacity = params => post('getRiverWayWeekOpacity', params);
export const getRiverWayWeekTrend = params => post('getRiverWayWeekTrend', params);
export const getRiverWayThermalPowerChartData = params => post('getRiverWayThermalPowerChart', params);
