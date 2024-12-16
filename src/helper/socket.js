import { io } from "socket.io-client";
import Constant from "../constant/constant";
import { v4 } from "uuid";

class Socket {
  static instance;
  #socket;
  #connectionEstablished = false;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Socket();
    }

    return this.instance;
  }

  constructor() {
    this.#socket = io(process.env.REACT_APP_SOCKET_BE_URL, {
      auth: { token: v4() },
      transports: ["websocket"],
      autoConnect: false,
    });
  }

  init() {
    if (!this.#connectionEstablished) {
      console.log("init socket");
      this.#socket.connect();

      this.#socket.on("connect", () => {
        console.log("socket connected successfully");

        // const connectEvent = new CustomEvent("connect");
        // document.dispatchEvent(connectEvent);
      });

      this.#socket.on("disconnect", () => {
        console.log("socket disconnected");
      });

      this.receiveMessage();

      this.#connectionEstablished = true
    }
  }

  joinRoom() {
    console.log(this.#socket.connected);
    if (this.#socket.connected) {
      this.#socket.emit(Constant.Socket_Emit_Event.JOIN_ROOM);
    }
  }

  leaveRoom() {
    this.#socket.emit(Constant.Socket_Emit_Event.LEAVE_ROOM);
  }

  sendMessage(message) {
    this.#socket.emit(Constant.Socket_Emit_Event.USER_MESSAGE_SENT, {
      message,
    });
  }

  receiveMessage() {
    this.#socket.on(Constant.Socket_Reciever_Event.AI_MESSAGE_SENT, (data) => {
      console.log("socet event receiveMessage");

      const aiMessageEvent = new CustomEvent(
        Constant.Socket_Reciever_Event.AI_MESSAGE_SENT,
        { detail: data }
      );
      document.dispatchEvent(aiMessageEvent);
    });
  }
}

export default Socket.getInstance();
