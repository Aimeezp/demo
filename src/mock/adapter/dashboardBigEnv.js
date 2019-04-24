import mock from './adapter';
import dashboardBigEnvData from '../data/dashboard/dashboardBigEnv';

mock.onPost('/getDashboardBigEnv').reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: {
        list: dashboardBigEnvData,
      },
    }]);
  }, 1000);
}));
