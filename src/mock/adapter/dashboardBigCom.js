// import qs from 'qs';
import mock from './adapter';
import dashaboardBigComData from '../data/dashboard/dashboardBigCom';

mock.onPost('/getDashboardBigCom').reply(() => {
  // const { projectName } = qs.parse(config.data);
  const total = dashaboardBigComData.length;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([200, {
        status: 1,
        data: {
          list: dashaboardBigComData,
          total,
        },
      }]);
    }, 1000);
  });
});
