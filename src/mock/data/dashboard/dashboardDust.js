import Mock from 'mockjs';
import { getNowTimeHM } from '../../../assets/js/getNowMonth6';

const dashboardDust = Mock.mock({
  heighter: [60, 62, 88, 80, 100, 78, 66],
  lowest: [23, 22, 20, 19, 21, 22, 22],
  average: [40, 45, 41, 39, 47, 46, 42],
  xAxis: getNowTimeHM(), // ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30'],
  number: 226, // 总告警数
  device: 20, // 设备总数
  monthAlarm: 100, // 月累计告警
  monthError: 31, // 月累计故障200
  dayAlarm: 10,
});
export default dashboardDust;
