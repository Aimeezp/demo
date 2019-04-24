import mock from './adapter';
import formatDate from '../../assets/js/formatDate';

const nowDate = formatDate(new Date());
mock.onPost('/getDashboardDoorLock').reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: {
        list: {
          judgeNum: 9,
          dayData: [3, 5, 6, 10, 6, 7, 9],
          monthData: [13, 9, 15, 19, 10, 22, 8],
          dayStartData: {
            startTime: `${nowDate} 13:48:32`,
            closeTime: `${nowDate} 14:00:33`,
            duration: '12分01秒',
          },
          dayCloseData: {
            startTime: `${nowDate} 15:38:30`,
            closeTime: `${nowDate} 16:00:40`,
            duration: '22分10秒',
          },
          // 左侧通用data
          totalEquipNum: 6,
          monthWarnNum: 2,
          dayWarnNum: 1,
          // 小面板
          doorlockSData: {
            number: 9, // 告警次数
            device: 6, // 设备总数
            monthAlarm: 2, // 月累计告警
            monthError: 1, // 故障次数
          },
        },
      },
    }]);
  }, 1000);
}));
