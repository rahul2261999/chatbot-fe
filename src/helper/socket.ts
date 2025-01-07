import { io, Socket } from "socket.io-client";
import Constant from "../constants/constant";
import { v4 } from "uuid";
import { Message } from "@/components/chatscreen/ChatWidget";
import exp from "constants";

export interface SocketInitOptions {
  token: string;
  userId: string;
}

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
      auth: { token: "i am groot" },
      transports: ["websocket"],
      autoConnect: false,
    });
  }

  init(options: SocketInitOptions) {
    console.log("init", options);
    
    this.socket.auth = {
      token: options.token,
      userId: options.userId,
    };

    if (!this.connectionEstablished) {
      console.log("init socket");
      this.socket.connect();

      this.socket.on("connect", () => {
        console.log("socket connected successfully");

        // const connectEvent = new CustomEvent("connect");
        // document.dispatchEvent(connectEvent);
      });

      this.socket.on("disconnect", () => {
        console.log("socket disconnected");
      });

      this.socket.on("error", () => {
        console.log("socket error");
      })

      this.socket.on("connect_error", (error) => {
        console.error("Connection error:", error.message); // Logs the connection error
      })

      this.receiveMessage();

      this.connectionEstablished = true;
    }
  }

  joinRoom() {
    console.log(this.socket.connected);
    if (this.socket.connected) {
      this.socket.emit(Constant.Socket_Emit_Event.JOIN_ROOM);
    }
  }

  leaveRoom() {
    this.socket.emit(Constant.Socket_Emit_Event.LEAVE_ROOM);
  }

  sendMessage(data: { message: string }) {
    this.socket.emit(Constant.Socket_Emit_Event.USER_MESSAGE_SENT, {
      data,
    });
  }

  receiveMessage() {
    this.socket.on(Constant.Socket_Reciever_Event.AI_MESSAGE_SENT, (data) => {
      console.log("socet event receiveMessage");

      const aiMessageEvent = new CustomEvent(
        Constant.Socket_Reciever_Event.AI_MESSAGE_SENT,
        { detail: data }
      );
      document.dispatchEvent(aiMessageEvent);
    });
  }
}

export default SocketClient.getInstance();
