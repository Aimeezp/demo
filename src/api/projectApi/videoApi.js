import { postJsonNotToken } from '../apiFun';

export const videoMonitorLiveBroadcast = params => postJsonNotToken('videoMonitorLiveBroadcast', params);
export const videoMonitorPlayBack = params => postJsonNotToken('videoMonitorPlayBack', params);
export const videoMonitorStopFun = params => postJsonNotToken('videoMonitorStop', params);
