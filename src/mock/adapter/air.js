import mock from './adapter';
import {
  airtable, airWeekTrendData, airMonthTrendData, airThermalPowerChartData,
} from '../data/air';
import airUrl from '../../api/apiList/airUrl';

mock.onPost(airUrl.getAirList).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: airtable,
      total: airtable.length,
    }]);
  }, 1000);
}));
mock.onPost(airUrl.getAirWeekTrendData).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: airWeekTrendData,
      total: airWeekTrendData.length,
    }]);
  }, 1000);
}));
mock.onPost(airUrl.getAirMonthTrendData).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: airMonthTrendData,
      total: airMonthTrendData.length,
    }]);
  }, 1000);
}));
mock.onPost(airUrl.getAirThermalPowerChart).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: airThermalPowerChartData,
      total: airThermalPowerChartData.length,
    }]);
  }, 1000);
}));
