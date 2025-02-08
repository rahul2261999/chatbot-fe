import { io, Socket } from "socket.io-client";
import Constant from "../../constants/constant";
import { AiAgentResponse, ISendMesssgaPayload, SocketInitOptions } from "@/types/socket.type";

class SocketClient {
  private static instance: SocketClient;
  private socket: Socket;
  private connectionEstablished = false;

  static getInstance() {
    if (!this.instance) {
      this.instance = new SocketClient();
    }

    return this.instance;
  }

  private constructor() {
    this.socket = io(process.env.REACT_APP_SOCKET_BE_URL, {
      transports: ["websocket"],
      autoConnect: false,
    });
  }

  init(options: SocketInitOptions) {
    this.socket.auth = options;

    if (!this.connectionEstablished) {
      console.log("initilizing socket connection......");
      this.socket.connect();

      this.socket.on("connect", () => {
        console.log("socket connected successfully");
      });

      this.socket.on("disconnect", () => {
        console.log("socket disconnected");
      });

      this.socket.on("error", () => {
        console.log("socket error");
      })

      this.socket.on("connect_error", (error) => {
      })

      this.receiveMessage();

      this.connectionEstablished = true;
    }
  }

  joinRoom() {
    if (this.socket.connected) {
      this.socket.emit(Constant.Socket_Emit_Event.JOIN_ROOM);
    }
  }

  leaveRoom() {
    this.socket.emit(Constant.Socket_Emit_Event.LEAVE_ROOM);
  }

  sendMessage(data: ISendMesssgaPayload) {
    this.socket.emit(Constant.Socket_Emit_Event.USER_MESSAGE, {
      data,
    });
  }

  receiveMessage() {
    this.socket.on(Constant.Socket_Reciever_Event.AI_AGENT_MESSAGE, (data: AiAgentResponse) => {
      console.log("Socket Event: AGENT_MESSAGE");

      const aiMessageEvent = new CustomEvent(
        Constant.Socket_Reciever_Event.AI_AGENT_MESSAGE,
        { detail: data }
      );
      document.dispatchEvent(aiMessageEvent);
    });
  }
}

export default SocketClient.getInstance();
