import { useEffect, useRef, useState } from "react";
import chatbot from "../../assets/logos/chatbot.png";
import { Send, XCircle } from "react-feather";
import socket from "../../helper/socket";
import Constant from "../../constant/constant";
import styles from "./chatscreen.module.css";

const initialState = {
  authorization: {
    verified: true,
    token: "",
  },
  loader: false,
  messageList: [
    {
      message: {
        paragraph: "Hello! I'm your AI assistant. How can I help you today?",
      },
      type: "AI",
    },
  ],
  form: {
    userMessage: "",
  },
};

const ChatScreen = ({ showChat = false, setShowChat }) => {
  const [state, setState] = useState(initialState);

  const handleAiMessage = (event) => receiveAiMessageEventHandler(event.detail);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    onAuthorize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAuthorize = () => {
    socket.init(localStorage.getItem("user-token"));

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
    setState((st) => ({
      ...st,
      loader: false,
    }));
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
      loader: true,
    }));
    scrollToBottom();
  };

  const receiveAiMessageEventHandler = (data) => {
    try {
      if (data?.errorMessage || !data) {
        setState((prevState) => ({
          ...prevState,
          messageList: [
            ...prevState.messageList,
            {
              message: {
                heading: "Error While generating response. Please try again",
              },
              type: "error",
            },
          ],
          loader: false,
        }));
        return;
      }
      const newMessages = data?.message.map((msg) => ({
        message: msg,
        type: "AI",
      }));

      setState((prevState) => ({
        ...prevState,
        messageList: [...prevState.messageList, ...newMessages],
        loader: false,
      }));
      scrollToBottom();
    } catch {
      setState((prevState) => ({
        ...prevState,
        messageList: [
          ...prevState.messageList,
          {
            message: {
              heading: "Error While generating response. Please try again",
            },
            type: "error",
          },
        ],
        loader: false,
      }));
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeHandler = (event) => {
    setState((st) => ({
      ...st,
      form: {
        ...state.form,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const messagesList = state?.messageList?.map((messageObj, index) => {
    return (
      <div
        key={index}
        className={
          messageObj.type === "AI" || messageObj.type === "error"
            ? styles.aiMessage
            : styles.userMessage
        }
      >
        {(messageObj.type === "AI" || messageObj.type === "error") && (
          <div
            className={
              messageObj.type !== "error"
                ? styles.messageContainerAiMessage
                : styles.messageContainerErrorMessage
            }
          >
            <div style={{ fontWeight: "600" }}>
              {messageObj?.message?.heading}
            </div>
            <div style={{ fontWeight: "500" }}>
              {messageObj?.message?.subheading}
            </div>
            <div>{messageObj?.message?.paragraph}</div>
            <br />
            {messageObj?.message?.list && (
              <div style={{ fontWeight: "600" }}>
                {messageObj?.message?.list?.heading}
              </div>
            )}
            <ul>
              {messageObj?.message?.list?.children &&
                messageObj?.message?.list?.children?.map((msg) => (
                  <li>{msg}</li>
                ))}
            </ul>
          </div>
        )}
        {messageObj.type !== "AI" && (
          <div className={styles.messageContainerUserMessage}>
            {messageObj.message}
          </div>
        )}
      </div>
    );
  });

  return (
    <>
      {showChat && (
        <div className={styles.chatSection}>
          <div className={styles.chatContainer}>
            <div className={styles.chatScreen}>
              <div className={styles.chatHeader}>
                <div className={styles.headerDetails}>
                  <img
                    src="https://storage.googleapis.com/media.landbot.io/51550/channels/C71EZXH3KZLX3HQTZO6NT9YY6EPK1YAQ.png"
                    alt=""
                    style={{ height: "30px", width: "30px" }}
                  />
                  <span className={styles.chatHeaderTitle}>
                    Conversational AI
                  </span>
                </div>
                <div className={styles.closeIcon}>
                  <span
                    onClick={() => {
                      setShowChat(false);
                    }}
                  >
                    <XCircle />{" "}
                  </span>
                </div>
              </div>
              <div className={styles.chatMessagesContainer}>
                <>
                  {messagesList}
                  {state.loader && (
                    <div className={styles.aiMessage}>
                      <div className={styles.messageContainerAiMessageLoader}>
                        Loading...
                      </div>
                    </div>
                  )}
                </>
                <div ref={messagesEndRef} />
              </div>
              <div className={styles.chatInputContainer}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  name="userMessage"
                  value={state.form.userMessage}
                  onChange={(event) => onChangeHandler(event)}
                  onKeyDown={handleEnterKey}
                  style={{
                    border:
                      "1px solid linear-gradient(135deg, #171818, hwb(207 28% 68%))",
                  }}
                />
                <button
                  onClick={() => sendMessageEventHandler()}
                  onKeyUpCapture={() => sendMessageEventHandler}
                  style={{
                    background: "linear-gradient(135deg, #2a2a72, #009ffd)",
                  }}
                >
                  <Send />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <span className={styles.botLogoDiv}>
        <img
          src={chatbot}
          className={styles.botLogo}
          alt=""
          onClick={() => {
            setShowChat(true);
          }}
        />
      </span>
    </>
  );
};

export default ChatScreen;
