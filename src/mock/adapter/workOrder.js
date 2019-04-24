import mock from './adapter';
import { workOrderList } from '../data/workOrderData';
import workOrderUrl from '../../api/apiList/workOrderUrl';

// 获取烟感数据列表
mock.onPost(workOrderUrl.getworkOrderList).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: workOrderList,
    }]);
  }, 1000);
}));
