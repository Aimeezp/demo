import mock from './adapter';
import {
  deviceList, infoList, logList,
} from '../data/device';
import deviceUrl from '../../api/apiList/deviceUrl';

// 获取设备列表
mock.onPost(deviceUrl.getDeviceList).reply((config) => {
  const pageNumC = JSON.parse(config.data).currentPage;
  const pageSizeC = JSON.parse(config.data).pageSize;
  const total = deviceList.length;
  const sendData = deviceList.filter((u, index) => index < pageSizeC * pageNumC
    && index >= pageSizeC * (pageNumC - 1));
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([200, {
        status: 1,
        data: {
          list: sendData,
          total,
        },
      }]);
    }, 1000);
  });
});

// 获取设备日志列表
mock.onPost(deviceUrl.getLogList).reply((config) => {
  const pageNumC = JSON.parse(config.data).currentPage;
  const pageSizeC = JSON.parse(config.data).pageSize;
  const total = logList.length;
  const sendData = logList.filter((u, index) => index < pageSizeC * pageNumC
    && index >= pageSizeC * (pageNumC - 1));
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([200, {
        status: 1,
        data: {
          list: sendData,
          total,
        },
      }]);
    }, 1000);
  });
});

// 获取设备下拉框
mock.onPost(deviceUrl.getDeviceSelectors).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: infoList,
    }]);
  }, 1000);
}));
