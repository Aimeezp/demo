import { videoMonitorIp } from '../../config/baseIp';

const base = `http://${videoMonitorIp}/drive/drive`;

export default {
  videoMonitorLiveBroadcast: `${base}/videoPlay`,
  videoMonitorPlayBack: `${base}/videoReplayPlay`,
  videoMonitorStop: `${base}/videoStop`,
};
