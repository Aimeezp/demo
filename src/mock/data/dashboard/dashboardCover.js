import Mock from 'mockjs';

const dashboardCover = Mock.mock({
  number: 32, // 总告警数
  device: 20, // 设备总数
  monthAlarm: 100, // 月累计告警
  lost: 6,
  lower: 10,
  dayWater: 25, // 当月水位
  dayWarn: 7, // 当月开启告警
  resoved: 5,
  unresoved: 27,
});
export default dashboardCover;
