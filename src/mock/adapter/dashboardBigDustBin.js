import mock from './adapter';
import dashboardBigDustBin from '../data/dashboard/dashboardBigDustBin';

mock.onPost('/getDustBin').reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: {
        list: dashboardBigDustBin,
      },
    }]);
  }, 1000);
}));
