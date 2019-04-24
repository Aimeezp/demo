import bus from '@/utils/eventBus';

class SmokeWarning {
  constructor() {
    this.data = function data() {
      return {
        ws: '',
      };
    };
    this.mounted = function mounted() {
      this.handle();
      // setTimeout(() => {
      //   this.handleMsg('{"businessStatus":null,"message":"1554886566123","type":"alarm","data":{"serialNumber":"869405030605894","timestamp":1550630753999,"battery":7.034,"signalStrength":-83,"batteryType":1,"messageType":2,"businessStatus":1,"object":{"serialNumber":"869405030605894","lng":121.587954,"bizCode":"01","signalStrength":-83,"typeName":"烟感","battery":7.034,"smokeDegree":0.0,"messageType":2,"projectAddr":"上海市长宁区长宁路1033号联通大厦","bizData":"01","addr":"上海市上海市浦东新区浦兴街道","projectName":"普通用户的温感项目","lat":31.316974,"batteryType":1,"reportTime":"2019-02-20 10:45:53"}}}');
      // }, 9000);
    };
    this.methods = {
      // 判断websocket是初始化还是销毁
      handle() {
        this.init();
      },
      // 初始化
      init() {
        // 初始化websocket
        window.vaApi
          .warningConnect({
            onMsgFun: this.handleMsg,
          })
          .then((res) => {
            this.ws = res;
          });
      },
      // 销毁websock
      destroy() {
        this.ws.close();
      },
      /**
       * alarm 告警
       * img 图片
       * 告警推送数据
       * {"businessStatus":null,"message":"1554886566123","type":"alarm","data":{"serialNumber":"869405030605894","timestamp":1550630753999,"battery":7.034,"signalStrength":-83,"batteryType":1,"messageType":2,"businessStatus":1,"object":{"serialNumber":"869405030605894","lng":121.587954,"bizCode":"01","signalStrength":-83,"typeName":"烟感","battery":7.034,"smokeDegree":0.0,"messageType":2,"projectAddr":"上海市长宁区长宁路1033号联通大厦","bizData":"01","addr":"上海市上海市浦东新区浦兴街道","projectName":"普通用户的温感项目","lat":31.316974,"batteryType":1,"reportTime":"2019-02-20 10:45:53"}}}
       * 图片url推送的数据
       * {"businessStatus":null,"message":"C:\\Users\\Fanghuanyu\\AppData\\Local\\Temp\\tomcat-docbase.5452963987267717477.8093\\imgupload\\1554863874.jpg","type":"img","data":null}
       */
      handleMsg(data) {
        // console.log(data);
        let msg = data;
        if (msg.indexOf('\\') !== -1) {
          msg = msg.replace(/\\/g, '/');
        }
        const obj = JSON.parse(msg);
        const { type } = obj;
        if (type === 'alarm') {
          // console.log('c');
          bus.$emit('fullAlarm', [obj, '烟警']);
        } else if (type !== 'alarm') {
          window.vaApi
            .getImgUrl({
              path: obj.message,
            })
            .then((res) => {
              this.$store.commit('SET_WORK_ORDER_IMG', res.config.url);
            });
        }
      },
    };
  }
}

export default () => new SmokeWarning();
