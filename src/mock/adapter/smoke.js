import mock from './adapter';
import { smokeList } from '../data/smoke';
import smokeUrl from '../../api/apiList/smokeUrl';

// 获取烟感数据列表
mock.onPost(smokeUrl.getSmokeList).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: smokeList,
    }]);
  }, 1000);
}));
