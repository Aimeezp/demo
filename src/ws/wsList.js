import { wsIp } from '@/config/baseIp';

// const base = `ws://${smokeIp}/smoke-sensor`;
const base = `ws://${wsIp}/ws`;

const urlList = {
  warning: `${base}/websocket`, // 火警、烟警推送
};

export default urlList;
