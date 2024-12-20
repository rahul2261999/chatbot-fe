import { useEffect, useState } from "react";
import styles from "./chatscreen.module.css";
import socket from "../../helper/socket";
import Constant from "../../constant/constant";

const initialState = {
  authorization: {
    verified: false,
    token: '',
  },
  loader: true,
  messageList: [],
  form: {
    userMessage: "",
  },
};

const ChatScreen = () => {
  const [state, setState] = useState(initialState);

  const handleAiMessage = (event) => receiveAiMessageEventHandler(event.detail);

  const authTokenInputHandler = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        authorization: {
          ...prevState.authorization,
          token: event.target.value,
        },
      };
    });
  };

  const onAuthorize = () => {
    socket.init(state.authorization.token);

    connectEventHandler();

    document.addEventListener(
      Constant.Socket_Reciever_Event.AI_MESSAGE_SENT,
      handleAiMessage
    );

    setState((prevState) => {
      return {
        ...prevState,
        authorization: {
          ...prevState.authorization,
          verified: true,
        },
      };
    });
  };

  const connectEventHandler = () => {
    setState({
      ...state,
      loader: false,
    });
  };

  const sendMessageEventHandler = () => {
    const userMessage = state.form.userMessage;

    if (userMessage.length === 0) {
      return;
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
    // Cleanup function: remove event listeners
    return () => {
      console.log("ChatScreen cleanup........");
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

  if (!state.authorization.verified && state.loader) {
    return (
      <div className={styles.authorizationModelOverlay}>
        <div className={styles.authorizationModelContainer}>
          <input
            type="text"
            className={styles.authorizationModelInput}
            name="token"
            value={state.authorization.token}
            placeholder="Enter your details"
            onChange={authTokenInputHandler}
          />
          <button
            className={styles.authorizationModelButton}
            onClick={onAuthorize}
          >
            Authorriation Key
          </button>
        </div>
      </div>
    );
  }

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
