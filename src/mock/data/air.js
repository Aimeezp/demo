import bus from '../../utils/eventBus';
import { devices } from './mainPage';

const airtablev = [];
const monitorPointData = ['霜竹公路1270号毛桥村招商办公室', '霜竹公路1269号毛桥村毛桥村委会大楼一楼会议室旁',
  '上海市黄浦区淡水路', '上海市黄浦区淡水路', '宝安公路3705弄包装城办公室西7楼电梯房', '上海市黄浦区淡水路',
  '上海市黄浦区淡水路', '上海市黄浦区淡水路', '宝安公路3705弄包装城办公室东6楼电房', '上海市黄浦区淡水路',
];
const pm = [20, 22, 16, 20, 13, 15, 14, 13, 13, 12];
const CO2 = [457, 459, 460, 456, 457, 457, 459, 465, 473, 475];
const monthTrendData = [7, 90, 89, 48, 8, 19, 23, 8, 9, 10, 56, 6, 16, 8, 10, 31, 10, 72, 5, 9, 2, 5, 3, 38, 34, 48, 7, 8, 67, 42];
let highest = [];
let minimum = [];
const monthTrendDataV = [];
const nowTime = new Date();
const monthPre = nowTime.getMonth();
const year = nowTime.getFullYear();
const monthDays = new Date(year, monthPre, 0).getDate();
const airThermalPowerChartDataV = [];
let getAirTotal = 0;
const weekTrendDataV = {
  highest: [],
  minimum: [],
};
const setAirData = function funName() {
  airtablev.length = 0;
  monthTrendDataV.length = 0;
  airThermalPowerChartDataV.length = 0;
  // table
  for (let i = 0; i < getAirTotal; i += 1) {
    airtablev.push({
      monitorPoint: monitorPointData[i] || monitorPointData[parseInt(Math.random() * 10, 10)],
      aqi: parseInt(Math.random() * 9, 10) + 7,
      pm: pm[i] || pm[parseInt(Math.random() * 10, 10)],
      CO2: CO2[i] || CO2[parseInt(Math.random() * 10, 10)],
    });
  }
  if (getAirTotal > 0) {
    // month trend
    for (let i = 0; i < monthDays; i += 1) {
      monthTrendDataV.push(monthTrendData[i]);
      // monthTrendDataV.push(parseInt(Math.random() * 17 + 2, 10));
    }
    // hot power
    const airDeviceDate = devices.filter(item => item.deviceType === 'air-quality');
    for (let i = 0; i < getAirTotal; i += 1) {
      if (i < airDeviceDate.length) {
        airThermalPowerChartDataV[i] = { lng: airDeviceDate[i].lng, lat: airDeviceDate[i].lat, count: 100 };
      } else {
        airThermalPowerChartDataV[i] = { lng: 0, lat: 0, count: 100 };
      }
    }
    // airThermalPowerChartDataV = [
    //   { lng: 121.422978, lat: 31.223748, count: 70 },
    //   { lng: 121.423198, lat: 31.223698, count: 70 },
    //   { lng: 121.42358, lat: 31.223933, count: 70 },
    //   { lng: 121.423903, lat: 31.224096, count: 70 },
    //   { lng: 121.423755, lat: 31.223856, count: 70 },
    //   { lng: 121.423562, lat: 31.223819, count: 70 },
    // ];
    // week trend
    highest = [16.5, 18, 17.5, 15.5, 16, 17, 18.5];
    minimum = [4.8, 4.9, 5.0, 5.5, 5.2, 6.0, 5.4];
    // for (let i = 0; i < 7; i += 1) {
    //   highest.push(parseInt(Math.random() * 19, 10) + 7);
    //   minimum.push(parseInt(Math.random() * 9, 10) - 2);
    // }
  }
  weekTrendDataV.highest = highest;
  weekTrendDataV.minimum = minimum;
};
setAirData();
bus.$on('getAirCollapseDataTotal', (airTotal) => {
  getAirTotal = airTotal;
  setAirData();
});
export const airThermalPowerChartData = airThermalPowerChartDataV;
export const airtable = airtablev;
export const airWeekTrendData = weekTrendDataV;
export const airMonthTrendData = monthTrendDataV;
