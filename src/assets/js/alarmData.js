import { mapGetters } from 'vuex';
import { formatDateDate } from './formatDateAll';
import bus from '../../utils/eventBus';

class SendWarning {
  constructor() {
    this.mounted = function mounted() {
      bus.$on('fullAlarm', (data) => {
        this.getMsg(data);
      });
    };
    this.computed = {
      ...mapGetters(['localStorageNumber']),
    };
    this.methods = {
      getMsg(data) {
        const websoketOrderData = [];
        const websoketMsgData = [];
        const appendData = data[0].data.object;
        const alarmTime = formatDateDate(parseInt(data[0].data.timestamp, 10));
        const pushObjOrder = {
          id: 5568,
          projectId: 5568,
          projectName: '0420展会项目',
          province: null,
          city: null,
          district: null,
          address: appendData.addr,
          managerId: 11,
          managerName: '周乐',
          managerMobile: '15236547895',
          testerId: 51,
          testerName: '李倩',
          testerMobile: '13127851205',
          supporterId: null,
          supporterName: null,
          supporterMobile: null,
          deviceCount: 1,
          passCount: 1,
          failedCount: 0,
          isDone: 2,
          type: 1,
          startTime: alarmTime,
          endTime: '',
          creater: '李倩',
          createTime: alarmTime,
          updater: '李倩',
          updateTime: '',
          sheetFrom: 1,
          dmpType: 2,
          timestamp: data[0].data.timestamp,
          details: [
            {
              msgId: 55610,
              msgState: '告警',
              msgLabel: '烟感告警',
              deviceType: '烟感',
              deviceBrand: '昊想',
              deviceMaker: 'H5-s',
              deviceImei: appendData.serialNumber,
              deviceAdress: appendData.addr,
              orderType: '已完成',
              time: alarmTime,
            },
          ],
        };
        const pushObjMsg = {
          index: 55610,
          msgStatus: 2,
          msgType: 1,
          msgLabel: '烟感告警',
          deviceType: appendData.typeName,
          deviceBrand: '昊想',
          deviceMaker: 'LP-35',
          deviceImei: appendData.serialNumber,
          deviceAdress: appendData.addr,
          time: alarmTime,
          resultStatus: '待确认',
          deviceType2: 'smoke-sensor',
          noticeType: [{
            type: '短信已通知',
            mode: '13999887766',
          }],
          dispatchStatus: 1,
        };
        websoketOrderData.push(pushObjOrder);
        websoketMsgData.push(pushObjMsg);
        if (websoketOrderData.length === 1 && localStorage.getItem('websoketOrderData')) {
          websoketOrderData.unshift(...JSON.parse(localStorage.getItem('websoketOrderData')));
          websoketMsgData.unshift(...JSON.parse(localStorage.getItem('websoketMsgData')));
        }
        if (this.localStorageNumber <= websoketOrderData.length) {
          websoketOrderData.shift();
          websoketMsgData.shift();
        }
        window.localStorage.setItem('websoketOrderData', JSON.stringify(websoketOrderData));
        window.localStorage.setItem('websoketMsgData', JSON.stringify(websoketMsgData));
        bus.$emit('sendAlarm');
      },
    };
  }
}
export default () => new SendWarning();
