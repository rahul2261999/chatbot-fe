import React, { useEffect, useState } from "react";
import Header from "./Header";
import ConversationList from "./ConversationList";
import ChatInput from "./ChatInput";
import styles from "../../styles/ChatWidget.module.css";
import { AIMessageRes, AIMessageProps } from "./AIMessage";
import socket from "../../helper/socket";
import Constant from "../../constants/constant";
import { v4 } from "uuid";

export interface UserMessageProps {
  text: string;
}

export interface Message {
  id: string;
  isAI: boolean;
  userMessage: UserMessageProps | null;
  aiMessage: AIMessageProps | null;
}

const ChatWidget: React.FC = () => {
  const initialMessages: Message[] = [
    {
      id: Date.now().toString(),
      aiMessage: {
        message: [
          {
            paragraph:
              "Hello! I'm your AI assistant. How can I help you today?",
          },
        ],

        intentButtons: [
          {
            label: "Get Started",
            action: () =>
              handleIntentButtonClick("get_started", "I want to get started"),
            aliasText: "I want to know the post impression of last month",
          },
          {
            label: "Learn More",
            action: () =>
              handleIntentButtonClick("learn_more", "I want to learn more"),
            aliasText: "I want to learn more",
          },
        ],
        sessionInfo: null,
      },
      isAI: true,
      userMessage: null,
    },
  ];
  const [loader, setLoader] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string>();

  const connectEventHandler = () => {
    setLoader(false);
  };

  const receiveAiMessageEventHandler = (data: AIMessageRes) => {
    console.log("receiveAiMessageEventHandler", data);

    const aiMessage: Message = {
      id: Date.now().toString(),
      isAI: true,
      userMessage: null,
      aiMessage: {
        sessionInfo: data.sessionInfo,
        message: data.message,
        intentButtons: [],
      },
    };

    setMessages((prevState) => [...prevState, aiMessage]);
  };

  const handleAiMessage = (event: any) =>
    receiveAiMessageEventHandler(event.detail);

  const upsertUserIdInLocalStorage = () => {
    let existingUserId = localStorage.getItem("userId");

    if (!existingUserId || (existingUserId && existingUserId.length === 0)) {
      existingUserId = v4();
      localStorage.setItem("userId", existingUserId);
      setUserId(existingUserId);
    }

    return existingUserId;
  };

  useEffect(() => {
    const userId = upsertUserIdInLocalStorage();
    // socket.init({
    //   token: "i am groot",
    //   userId: userId,
    // });

    connectEventHandler();
    setMessages(initialMessages);

    document.addEventListener(
      Constant.Socket_Reciever_Event.AI_MESSAGE_SENT,
      handleAiMessage
    );

    // Cleanup function: remove event listeners
    return () => {
      console.log("ChatScreen cleanup........");
      document.removeEventListener(
        Constant.Socket_Reciever_Event.AI_MESSAGE_SENT,
        handleAiMessage
      );

      setMessages([]);
    };
  }, []);

  const addMessage = (text: string, isAI: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      userMessage: {
        text: text,
      },
      aiMessage: null,
      isAI,
    };

    console.log("addMessage", newMessage);
    // socket.sendMessage({ message: text });
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleIntentButtonClick = (intent: string, aliasText: string) => {
    // Add user message with aliasText
    addMessage(aliasText, false);
  };

  return (
    <div className={styles.chatWidget}>
      <Header title="AI Chat Assistant" />
      <ConversationList
        messages={messages}
        onIntentButtonClick={handleIntentButtonClick}
      />
      <ChatInput
        disabled={loader}
        onSendMessage={(text) => addMessage(text, false)}
      />
    </div>
  );
};

export default ChatWidget;
