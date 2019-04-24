import './adapter/mainPage';
import './adapter/service';
import './adapter/smoke';
import './adapter/dashboardBigCom';
import './adapter/dashboardBigEnv';
import './adapter/dashboardCover';
import './adapter/dashboardBigDustBin';
import './adapter/dashboardDoorLock';
import './adapter/dashboardDust';
import './adapter/bigSmoke';
import './adapter/dashboardEdit';
import './adapter/air';
import './adapter/msgData';
import './adapter/device';
import './adapter/car';
import './adapter/workOrder';
import './adapter/noise';
import './adapter/riverWay';
import './adapter/hydrant';


import mock from './adapter/adapter';

mock.onAny().passThrough();
