import store from '../store';

const ws = {
  wSocket: '',
  url: '',
  onOpenFun: '',
  onMsgFun: '',
  onCloseFun: '',
  userClose: false, // 是否用户主动关闭websocket
  i: 0, // 断线重连次数
  // 初始化
  init() {
    this.userClose = false;
    this.wSocket = new WebSocket(this.url);
    this.wSocket.onopen = (evt) => {
      this.i = 0;// 重置重连次数
      store.commit('SET_STATUS', true);// 在线
      this.onOpen(evt);
    };
    this.wSocket.onmessage = (evt) => {
      this.onMessage(evt.data);
    };
    this.wSocket.onclose = (evt) => {
      store.commit('SET_STATUS', false);// 离线
      this.onclose(evt);
    };
  },
  onOpen(evt) {
    if (this.onOpenFun) {
      this.onOpenFun(evt);
    }
  },
  // 发消息
  send(msg) {
    // 若是ws开启状态
    if (this.wSocket.readyState === WebSocket.OPEN) {
      this.websocketsend(msg);
    } else if (this.wSocket.readyState === WebSocket.CONNECTING) {
      // 若是 正在开启状态，则等待300毫秒
      const that = this;// 保存当前对象this
      setTimeout(() => {
        that.websocketsend(msg);
      }, 300);
    } else {
      // 若未开启 ，则等待500毫秒
      this.init();
      const that = this;// 保存当前对象this
      setTimeout(() => {
        that.websocketsend(msg);
      }, 500);
    }
  },
  websocketsend(content) {
    this.wSocket.send(content);
  },
  // 接收消息
  onMessage(evt) {
    if (this.onMsgFun) {
      this.onMsgFun(evt);
    }
  },
  // 关闭连接
  onclose(evt) {
    if (this.onCloseFun) {
      this.onCloseFun(evt);
    }
    // 掉线重连
    if (!this.userClose && this.i < 5) {
      this.i += 1;
      this.init();
    }
  },
  // 中断websocket链接
  close(evt) {
    this.userClose = true;
    this.wSocket.close(evt);
  },
};

export default ws;
