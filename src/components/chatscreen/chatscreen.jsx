import { useEffect, useState } from "react";
import styles from "./chatscreen.module.css";
import socket from "../../helper/socket";
import Constant from "../../constant/constant";

const initialState = {
  loader: true,
  messageList: [],
  form: {
    userMessage: "",
  },
};
const ChatScreen = () => {
  const [state, setState] = useState(initialState);

  const connectEventHandler = () => {
    setState({
      ...state,
      loader: false,
    });
  };

  const sendMessageEventHandler = () => {
    const userMessage = state.form.userMessage;

    if(userMessage.length === 0){
      return
    }

    socket.sendMessage(userMessage);

    setState((prevState) => ({
      ...prevState,
      messageList: [
        ...prevState.messageList,
        { type: "USER", message: userMessage },
      ],
      form: {
        userMessage: "",
      },
    }));
  };

  const receiveAiMessageEventHandler = (data) => {
    console.log("receiveAiMessageEventHandler");

    setState((prevState) => ({
      ...prevState,
      messageList: [
        ...prevState.messageList,
        { message: data.answer, type: "AI" },
      ],
    }));
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessageEventHandler();
    }
  };

  useEffect(() => {
    console.log("use effect called");
    socket.init();

    connectEventHandler();

    const handleAiMessage = (event) =>
      receiveAiMessageEventHandler(event.detail);

    document.addEventListener(
      Constant.Socket_Reciever_Event.AI_MESSAGE_SENT,
      handleAiMessage
    );

    // Cleanup function: remove event listeners
    return () => {
      document.removeEventListener(
        Constant.Socket_Reciever_Event.AI_MESSAGE_SENT,
        handleAiMessage
      );

      setState(initialState);
    };
  }, []);

  const onChangeHandler = (event) => {
    setState({
      ...state,
      form: {
        ...state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  const messagesList = state.messageList.map((message, index) => {
    return (
      <div
        key={index}
        className={
          message.type === "AI" ? styles.aiMessage : styles.userMessage
        }
      >
        <div>{message.message}</div>
      </div>
    );
  });

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatScreen}>
        <div className={styles.chatHeader}>Chat</div>
        <div className={styles.chatMessagesContainer}>{messagesList}</div>
        <div className={styles.chatInputContainer}>
          <input
            type="text"
            placeholder="Type a message..."
            name="userMessage"
            value={state.form.userMessage}
            onChange={(event) => onChangeHandler(event)}
            onKeyDown={handleEnterKey}
          />
          <button
            onClick={() => sendMessageEventHandler()}
            onKeyUpCapture={() => sendMessageEventHandler}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
