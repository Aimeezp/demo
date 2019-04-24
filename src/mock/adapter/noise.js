import mock from './adapter';
import { noiseData } from '../data/noise/noiseData';
import { realTimeNoiseData } from '../data/noise/realTimeNoiseData';
import { noiseTableData } from '../data/noise/noiseTableData';
import noiseUrl from '../../api/apiList/noiseUrl';

// 获取一周噪音状态
mock.onPost(noiseUrl.getWeekNoiseState).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: noiseData,
    }]);
  }, 1000);
}));
// 获取实时噪音
mock.onPost(noiseUrl.getRealTimeNoise).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: realTimeNoiseData,
    }]);
  }, 1000);
}));
// 获取噪音列表
mock.onPost(noiseUrl.getNoiseList).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: noiseTableData,
    }]);
  }, 1000);
}));
