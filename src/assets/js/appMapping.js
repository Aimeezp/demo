// 前后台设备类型对应关系
export const appMapping = {
  smoke: {
    val: 'smoke-sensor',
    text: '烟感',
    src: require('@/assets/images/app/smoke.png'),
  },
  cover: {
    val: 'well-cover',
    text: '井盖',
    src: require('@/assets/images/app/cover.png'),
  },
  doorlock: {
    val: 'door-monitor',
    text: '门磁',
    src: require('@/assets/images/app/doorlock.png'),
  },
  dust: {
    val: 'area-dust-monitor',
    text: '扬尘',
    src: require('@/assets/images/app/dust.png'),
  },
  dustbin: {
    val: 'dustbin',
    text: '垃圾箱',
    src: require('@/assets/images/app/dustbin.png'),
  },
  infraRed: {
    val: 'infra-red',
    text: '红外',
    src: require('@/assets/images/app/infraRed.png'),
  },
  lift: {
    val: 'lift',
    text: '电梯',
    src: require('@/assets/images/app/lift.png'),
  },
  alarmBtn: {
    val: 'alarm-btn',
    text: '一键告警',
    src: require('@/assets/images/app/alarmBtn.png'),
  },
  geoMonitor: {
    val: 'geo-mnt',
    text: '地磁',
    src: require('@/assets/images/app/geoMonitor.png'),
  },
  hydrant: {
    val: 'fire-hydrant',
    text: '栓帽',
    src: require('@/assets/images/app/hydrant.png'),
  },
  firePressure: {
    val: 'fire-pressure',
    text: '水压',
    src: require('@/assets/images/app/firePressure.png'),
  },
  airQuality: {
    val: 'air-quality',
    text: '空气监测',
    src: require('@/assets/images/app/airQuality.png'),
  },
  gasMonitor: {
    val: 'gas-monitor',
    text: '燃气',
    src: require('@/assets/images/app/gasMonitor.png'),
  },
  light: {
    val: 'light',
    text: '灯杆',
    src: require('@/assets/images/app/light.png'),
  },
  temperature: {
    val: 'temperature',
    text: '温感',
    src: require('@/assets/images/app/temperature.png'),
  },
  h2s: {
    val: 'h2s',
    text: '硫化氢监测',
    src: require('@/assets/images/app/airQuality-H2S.png'),
  },
  nh3: {
    val: 'nh3',
    text: '氨气监测',
    src: require('@/assets/images/app/airQuality-NH3.png'),
  },
  noise: {
    val: 'noise',
    text: '噪声',
    src: require('@/assets/images/app/noise.png'),
  },
  ultrasonic: {
    val: 'ultrasonic',
    text: '超声波',
    src: require('@/assets/images/app/ultrasonic.png'),
  },
  water: {
    val: 'water-monitor',
    text: '水质监测',
    src: require('@/assets/images/app/water.png'),
  },
  environment: {
    val: 'env-monitor',
    text: '环境监测',
    src: require('@/assets/images/app/environment.png'),
  },
  rfid: {
    val: 'RFID',
    text: 'RFID',
    src: require('@/assets/images/app/RFID.png'),
  },
  bracelet: {
    val: 'bracelet',
    text: '手环',
    src: require('@/assets/images/app/bracelet.png'),
  },
  pad: {
    val: 'pad',
    text: '手环',
    src: require('@/assets/images/app/pad.png'),
  },
  arc: {
    val: 'arc',
    text: '电弧监测',
    src: require('@/assets/images/app/arc.png'),
  },
  pos: {
    val: 'pos',
    text: 'POS',
    src: require('@/assets/images/app/POS.png'),
  },
  g4Router: {
    val: '4gRouter',
    text: '4G路由',
    src: require('@/assets/images/app/4gRouter.png'),
  },
  gps: {
    val: 'gps',
    text: 'GPS',
    src: require('@/assets/images/app/gps.png'),
  },
  camera: {
    val: 'camera',
    text: '摄像头',
    src: require('@/assets/images/app/camera.png'),
  },
};
const valueArrV = [];
const keyArrV = Object.keys(appMapping);
const deviceTypeTxtV = [];
const appDataV = [];
Object.values(appMapping).forEach((item) => {
  valueArrV.push(item.val);
  deviceTypeTxtV.push(item.text);
  appDataV.push(item);
});
export const valueArr = valueArrV;
export const keyArr = keyArrV;
export const deviceTypeTxt = deviceTypeTxtV;
export const appData = appDataV;
// 地图上右侧的设备类型
export const mapDevices = ['airQuality', 'water', 'noise', 'dustbin', 'hydrant', 'geoMonitor',
  'cover', 'smoke', 'gasMonitor', 'infraRed', 'light',
];
