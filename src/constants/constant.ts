class Constant {
  static Socket_Emit_Event = {
    JOIN_ROOM: "JOIN_ROOM",
    LEAVE_ROOM: "LEAVE_ROOM",
    USER_MESSAGE_SENT: "USER_MESSAGE_SENT",
  };

  static Socket_Reciever_Event = {
    AI_MESSAGE_SENT: "AI_MESSAGE_SENT",
    USER_JOINED: "USER_JOINED",
    USER_LEFT: "USER_LEFT",
  };
}

export default Constant
