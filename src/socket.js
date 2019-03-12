var wsUri = "wss://js-assignment.evolutiongaming.com/ws_api";

const websocket = {
  socket: null,
  callbacks: {},
  onConnect(cb) {
    this.socket.onopen = cb;
  },
  onMessageType(msg, cb) {
    this.callbacks[msg] = cb;
  },
  send(data) {
    this.socket.send(JSON.stringify(data));
  },
  onMessage(type, payload) {
    const cb = this.callbacks[type];
    if (cb) {
      cb(payload);
    }
  },
};

export const getSocket = () => {
  if (websocket.socket) {
    return websocket;
  }
  websocket.socket = new WebSocket(wsUri);
  websocket.socket.onmessage = (evt) => {
    const data = JSON.parse(evt.data);
    const { $type, ...payload } = data;
    websocket.onMessage($type, payload);
  };
  return websocket;
}


