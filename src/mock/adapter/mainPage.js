import mock from './adapter';
import { devices } from '../data/mainPage';
import mainPageUrl from '../../api/apiList/mainPageUrl';

// 获取烟感大模块数据列表
mock.onPost(mainPageUrl.getDevices).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: devices,
    }]);
  }, 1000);
}));
