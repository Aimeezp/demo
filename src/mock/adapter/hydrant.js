import mock from './adapter';
import {
  hydrantTableV, oneDayAttrV, twoDayAttrV, threeDayAttrV, fourDayAttrV, fiveDayAttrV, sixDayAttrV, sevenDayAttrV,
} from '../data/hydrant';
import hydrantUrl from '../../api/apiList/hydrantUrl';

mock.onPost(hydrantUrl.getHydrantList).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: hydrantTableV,
      total: hydrantTableV.length,
    }]);
  }, 1000);
}));

mock.onPost(hydrantUrl.getHydrantWeekTrendData).reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: [oneDayAttrV, twoDayAttrV, threeDayAttrV, fourDayAttrV, fiveDayAttrV, sixDayAttrV, sevenDayAttrV],
    }]);
  }, 1000);
}));
