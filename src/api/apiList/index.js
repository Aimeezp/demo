import commonUrl from './commonUrl';
import mainPageUrl from './mainPageUrl';
import serviceUrl from './serviceUrl';
import smokeUrl from './smokeUrl';
import dashboardBigUrl from './dashboardCoverUrl';
import dashboardBigEnvUrl from './dashboardBigEnvUrl';
import dashboardBigComUrl from './dashaboardBigComUrl';
import dashboardDoorLockUrl from './dashboardDoorLockUrl';
import dashboardDustBinUrl from './dashboardDustBinUrl';
import dashboardDustUrl from './dashboardDustUrl';
import bigSmokeUrl from './bigSmokeUrl';
import airUrl from './airUrl';
import deviceUrl from './deviceUrl';
import msgUrl from './msgUrl';
import carUrl from './carUrl';
import workOrderUrl from './workOrderUrl';
import noiseUrl from './noiseUrl';
import riverWyUrl from './riverWayUrl';
import hydrantUrl from './hydrantUrl';
import videoUrl from './videoUrl';

export default Object.assign(...[{}, commonUrl, mainPageUrl, serviceUrl, smokeUrl,
  dashboardBigUrl, dashboardBigEnvUrl, dashboardBigComUrl, dashboardDoorLockUrl, dashboardDustBinUrl,
  dashboardDustUrl, bigSmokeUrl, deviceUrl, airUrl, msgUrl, carUrl, workOrderUrl, noiseUrl, riverWyUrl,
  hydrantUrl, videoUrl]);
