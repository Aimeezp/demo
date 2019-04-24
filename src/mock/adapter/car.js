import mock from './adapter';
import { carInterList, carOuterList } from '../data/car';
import carUrl from '../../api/apiList/carUrl';

// 获取进场停车数据列表
mock.onPost(carUrl.getCarInterList).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: carInterList,
    }]);
  }, 1000);
}));
// 获取离场停车数据列表
mock.onPost(carUrl.getCarOuterList).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: carOuterList,
    }]);
  }, 1000);
}));
