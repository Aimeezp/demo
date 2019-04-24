const hydrantTable = [];
const levelData = ['水压过低', '设备倾倒', '电压过低', '设备正常', '电压过高', '水压过高'];
const monitorPointData = ['西北门', '西南门', '中央大门', '社区花园', '车辆出入口', '沿岸亲子湾'];
const numAttr = [1.3, 1.8, 2.1, 0.9, 1.0, 0.6, 1.5];
const oneDayAttr = {
  type: 'line',
  smooth: true,
  lineStyle: { color: '#F38715' },
  name: 'one',
  data: [0.8, 1.9, 1.5, 1.5, 1.2, 2, 1.1],
};
const twoDayAttr = {
  type: 'line',
  smooth: true,
  lineStyle: { color: '#EEB4B3' },
  name: 'two',
  data: [1.5, 2.1, 1.3, 2.1, 1.9, 1, 1.5],
};
const threeDayAttr = {
  type: 'line',
  smooth: true,
  lineStyle: { color: '#4DA8F3' },
  name: 'three',
  data: [0.3, 1.7, 2, 1.5, 1.9, 1.5, 2.1],
};
const fourDayAttr = {
  type: 'line',
  smooth: true,
  lineStyle: { color: '#C196E5' },
  name: 'four',
  data: [0.6, 1.9, 2.3, 1.0, 1.1, 1, 2.1],
};
const fiveDayAttr = {
  type: 'line',
  smooth: true,
  lineStyle: { color: '#1EC663' },
  name: 'five',
  data: [0.8, 1.2, 1.8, 1.4, 1.6, 2, 1.3],
};
const sixDayAttr = {
  type: 'line',
  smooth: true,
  lineStyle: { color: '#F36759' },
  name: 'six',
  data: [0.9, 1.3, 1, 1.5, 1.9, 1, 2.1],
};
const sevenDayAttr = {
  type: 'line',
  smooth: true,
  lineStyle: { color: '#48D182' },
  name: 'seven',
  data: [1, 0.9, 1.3, 1.5, 2.1, 1.9, 1],
};
// const weekDate = [];
for (let i = 0; i < 10; i += 1) {
  hydrantTable.push({
    monitoringPoint: monitorPointData[parseInt(Math.random() * 5, 10)],
    waterLevel: (Math.random() * 1 + 1).toFixed(3),
    state: levelData[parseInt(Math.random() * 5, 10)],
    num: parseInt(numAttr[parseInt(Math.random() * 5, 10)], 10),
  });
}
export const hydrantTableV = hydrantTable;
export const oneDayAttrV = oneDayAttr;
export const twoDayAttrV = twoDayAttr;
export const threeDayAttrV = threeDayAttr;
export const fourDayAttrV = fourDayAttr;
export const fiveDayAttrV = fiveDayAttr;
export const sixDayAttrV = sixDayAttr;
export const sevenDayAttrV = sevenDayAttr;
