import * as wsApi from '../ws';
import * as commonApi from './projectApi/commonApi';
import * as mainPageApi from './projectApi/mainPageApi';
import * as serviceApi from './projectApi/serviceApi';
import * as smokeApi from './projectApi/smokeApi';
import * as bigCoverApi from './dashboardApi/CoverApi';
import * as bigEnvApi from './dashboardApi/bigEnvApi';
import * as bigComApi from './dashboardApi/bigComApi';
import * as dashboardDoorLockApi from './dashboardApi/doorLockApi';
import * as dashboardDustApi from './dashboardApi/DustApi';
import * as bigDustBin from './dashboardApi/DustBin';
import * as bigSmokeApi from './projectApi/bigSmokeApi';
import * as airApi from './projectApi/airApi';
import * as msgApi from './projectApi/msgApi';
import * as deviceApi from './projectApi/deviceApi';
import * as carApi from './projectApi/carApi';
import * as workOrderApi from './projectApi/workOrderApi';
import * as noiseApi from './projectApi/noiseApi';
import * as riverWayApi from './projectApi/riverWayApi';
import * as hydrantApi from './projectApi/hydrantApi';
import * as videoApi from './projectApi/videoApi';

window.vaApi = Object.assign(...[Object.create(null), commonApi, mainPageApi, serviceApi, smokeApi,
  bigCoverApi, bigEnvApi, bigComApi, dashboardDoorLockApi, dashboardDustApi, bigDustBin, bigSmokeApi,
  msgApi, deviceApi, airApi, carApi, workOrderApi, noiseApi, riverWayApi, wsApi, hydrantApi, videoApi]);
