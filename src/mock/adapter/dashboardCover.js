import mock from './adapter';
import dashboardBigCover from '../data/dashboard/dashboardCover';

mock.onPost('/cover/cover-data').reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: {
        list: dashboardBigCover,
      },
    }]);
  }, 1000);
}));
