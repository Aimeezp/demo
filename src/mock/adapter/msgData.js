import mock from './adapter';
import { msgDataList } from '../data/msgData';
import msgUrl from '../../api/apiList/msgUrl';

// 获取烟感数据列表
mock.onPost(msgUrl.getMsgList).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: msgDataList,
    }]);
  }, 1000);
}));
mock.onPost(msgUrl.msgInfoDispatch).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: [],
      total: 0,
    }]);
  }, 1000);
}));
mock.onPost(msgUrl.msgInfoConfirmOrCancel).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: [],
      total: 0,
    }]);
  }, 1000);
}));
