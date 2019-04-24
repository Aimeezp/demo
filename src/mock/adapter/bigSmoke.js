import mock from './adapter';
import smokeWarnList from '../data/smoke/smokeWarnList';

// 获取烟感大模块数据列表
mock.onPost('/smoke/smokeWarnList').reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: {
        list: smokeWarnList,
      },
    }]);
  }, 1000);
}));
