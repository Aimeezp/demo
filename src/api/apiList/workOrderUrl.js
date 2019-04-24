import { wsIp } from '../../config/baseIp';

const base = `http://${wsIp}/demo/api-demo`;
export default {
  getworkOrderList: '/getworkOrderList', // 获取工单列表
  getImgUrl: `${base}/downloadImage`,
};
