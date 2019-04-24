import bus from '../../utils/eventBus';
import { devices } from './mainPage';

const rivertablev = [];
const monitorPointData = ['霜竹公路1270号毛桥村招商办公室', '霜竹公路1269号毛桥村毛桥村委会大楼一楼会议室旁',
  '上海市黄浦区淡水路', '上海市黄浦区淡水路', '宝安公路3705弄包装城办公室西7楼电梯房', '上海市黄浦区淡水路',
  '上海市黄浦区淡水路', '上海市黄浦区淡水路', '宝安公路3705弄包装城办公室东6楼电房', '上海市黄浦区淡水路',
];
const weekOpacityDataV = [];
const riverWayWeekTrendDataV = {
  evaporationData: [],
  precipitationData: [],
  averageTemperData: [],
};
const averageTemperData = [10, 12, 14, 15, 16, 17, 20];
const evaporationData = [6, 7, 8, 9, 10, 11, 12];
const riverWayThermalPowerChartDataV = [];
let getRiverWayDataTotal = 0;
const setRiverWayData = function funName() {
  rivertablev.length = 0;
  riverWayWeekTrendDataV.evaporationData.length = 0;
  riverWayWeekTrendDataV.precipitationData.length = 0;
  riverWayWeekTrendDataV.averageTemperData.length = 0;
  riverWayThermalPowerChartDataV.length = 0;
  weekOpacityDataV.length = 0;
  // table
  for (let i = 0; i < getRiverWayDataTotal; i += 1) {
    rivertablev.push({
      monitorPoint: monitorPointData[i] || monitorPointData[parseInt(Math.random() * 4, 10)],
      lu: (Math.random() * 0.011 + 0.011).toFixed(3),
      anDan: (Math.random() * 2.2 + 1.1).toFixed(1),
      opacity: (Math.random() * 0.034 + 0.011).toFixed(3),
      temperature: parseInt(Math.random() * 21 + 5, 10),
    });
  }
  if (getRiverWayDataTotal > 0) {
    // week trend
    for (let i = 0; i < 7; i += 1) {
      riverWayWeekTrendDataV.evaporationData.push(evaporationData[i]);
      // riverWayWeekTrendDataV.evaporationData.push((Math.random() * 24.7 + 2).toFixed(1));
      riverWayWeekTrendDataV.precipitationData.push((Math.random() * 11 + 15).toFixed(1));
      riverWayWeekTrendDataV.averageTemperData.push(averageTemperData[i]);
      // riverWayWeekTrendDataV.averageTemperData.push((Math.random() * 28.1 + 2.6).toFixed(1));
    }
    // hot power chart
    const airDeviceDate = devices.filter(item => item.deviceType === 'water-monitor');
    for (let i = 0; i < getRiverWayDataTotal; i += 1) {
      if (i < airDeviceDate.length) {
        riverWayThermalPowerChartDataV[i] = { lng: airDeviceDate[i].lng, lat: airDeviceDate[i].lat, count: 100 };
      } else {
        riverWayThermalPowerChartDataV[i] = { lng: 0, lat: 0, count: 100 };
      }
    }
    // riverWayThermalPowerChartDataV = [
    //   { lng: 121.423562, lat: 31.224138, count: 70 },
    //   { lng: 121.423059, lat: 31.223702, count: 70 },
    //   { lng: 121.423728, lat: 31.223841, count: 70 },
    //   { lng: 121.423513, lat: 31.223941, count: 70 },
    //   { lng: 121.423791, lat: 31.223914, count: 70 },
    //   { lng: 121.423589, lat: 31.22393, count: 70 },
    // ];
    // week opacity
    for (let i = 0; i < 7; i += 1) {
      for (let j = 0; j < 24; j += 1) {
        weekOpacityDataV.push([i, j, parseInt(Math.random() * 13, 10)]);
      }
    }
  }
};
bus.$on('getRiverWayDataTotal', (riverWayTotal) => {
  getRiverWayDataTotal = riverWayTotal;
  setRiverWayData();
});
setRiverWayData();
export const riverWayThermalPowerChartData = riverWayThermalPowerChartDataV;
export const riverWaytable = rivertablev;
export const riverWayWeekOpacityData = weekOpacityDataV;
export const riverWayWeekTrendData = riverWayWeekTrendDataV;
