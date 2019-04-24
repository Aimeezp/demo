import mock from './adapter';
import dashboardDust from '../data/dashboard/dashboardDust';

mock.onPost('/dust/dust-data').reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: {
        list: dashboardDust,
      },
    }]);
  }, 1000);
}));
