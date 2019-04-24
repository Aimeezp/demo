import mock from './adapter';
import {
  riverWaytable, riverWayWeekOpacityData, riverWayWeekTrendData, riverWayThermalPowerChartData,
} from '../data/riverWay';
import airUrl from '../../api/apiList/riverWayUrl';

mock.onPost(airUrl.getRiverWayTable).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: riverWaytable,
      total: riverWaytable.length,
    }]);
  }, 1000);
}));
mock.onPost(airUrl.getRiverWayWeekOpacity).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: riverWayWeekOpacityData,
      total: riverWayWeekOpacityData.length,
    }]);
  }, 1000);
}));
mock.onPost(airUrl.getRiverWayWeekTrend).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: riverWayWeekTrendData,
    }]);
  }, 1000);
}));
mock.onPost(airUrl.getRiverWayThermalPowerChart).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: riverWayThermalPowerChartData,
      total: riverWayThermalPowerChartData.length,
    }]);
  }, 1000);
}));
