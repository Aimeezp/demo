import mock from './adapter';
import iconList from '../data/dashboard/dashboardIconList';
import blockList from '../data/dashboard/dashboardBlockList';
import { dashboard } from '@/storage/localStorage';
import { Local } from '@/utils/storage';

// 保存dashboard的数据
mock.onPost('/dashboard/dashboardSave').reply(params => new Promise((resolve) => {
  Local.setSingle(dashboard, params.data);
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: params.data,
    }]);
  }, 1000);
}));

// 获取dashboard左侧列表数据
mock.onPost('/dashboard/dashboardList').reply(() => new Promise((resolve) => {
  setTimeout(() => {
    const dashboardData = Local.getSingle(dashboard);
    const dashboardDataObj = JSON.parse(dashboardData);
    if (dashboardDataObj) {
      resolve([200, {
        status: 1,
        data: dashboardDataObj,
      }]);
    } else {
      resolve([200, {
        status: 1,
        data: {
          iconList,
          blockList,
        },
      }]);
    }
  }, 1000);
}));
