import mock from './adapter';
import { trapdoorData } from '../data/service/trapdoorState';
import { weekTrapdoorData } from '../data/service/weekTrapdoorState';
import { weekDustbinTrendData } from '../data/service/weekDustbinTrendData';
import { dustbinTableData } from '../data/service/dustbinTableData';
import { trapdoorTableData } from '../data/service/trapdoorTableData';
import { dustbinMarchData } from '../data/service/dustbinMarchData';
import serviceUrl from '../../api/apiList/serviceUrl';

// 获取井盖状态
mock.onPost(serviceUrl.getTrapdoorState).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: trapdoorData,
    }]);
  }, 1000);
}));

// 获取一周井盖状态
mock.onPost(serviceUrl.getWeekTrapdoorState).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: weekTrapdoorData,
    }]);
  }, 1000);
}));

// 获取垃圾箱一周走势
mock.onPost(serviceUrl.getWeekDustbinTrendData).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: weekDustbinTrendData,
    }]);
  }, 1000);
}));

// 获取垃圾箱列表
mock.onPost(serviceUrl.getDustbinList).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: dustbinTableData,
    }]);
  }, 1000);
}));

// 获取井盖列表
mock.onPost(serviceUrl.getTrapList).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: trapdoorTableData,
    }]);
  }, 1000);
}));

// 获取垃圾箱3月走势
mock.onPost(serviceUrl.getMarchTrendData).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: dustbinMarchData,
    }]);
  }, 1000);
}));
