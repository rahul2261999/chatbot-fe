import React, { useEffect, useState } from "react";
import Header from "./Header";
import ConversationList from "./ConversationList";
import ChatInput from "./ChatInput";
import styles from "../../styles/ChatWidget.module.css";
import Constant from "../../constants/constant";
import {
  AiAgentMessage,
  ChatMessage,
  ChatMessageType,
  QuickReplyButton,
  SystemMessage,
  UserMessage,
} from "@/types/chat.type";
import { AiAgentResponse } from "@/types/socket.type";

const Chat: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(true);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const connectEventHandler = () => {
    setLoader(false);
  };

  const receiveAiMessageEventHandler = (data: AiAgentResponse) => {
    console.log("receiveAiMessageEventHandler", data);

    const aiAgentMessage: AiAgentMessage = {
      message: data.chatResponse,
    };

    const message: ChatMessage = {
      id: Date.now(),
      type: ChatMessageType.AI_AGENT_MESSAGE,
      message: aiAgentMessage,
    };

    setChatMessages((prevState) => [...prevState, message]);
  };

  const handleAiMessage = (event: any) =>
    receiveAiMessageEventHandler(event.detail);

  useEffect(() => {
    connectEventHandler();
    const quickReplies: QuickReplyButton[] = [
      {
        label: "Get Started",
        intent: "I want to know the post impression of last month",
        action: () => handleIntentButtonClick("I want to get started"),
      },
      {
        label: "Learn More",
        intent: "I want to learn more",
        action: () => handleIntentButtonClick("I want to learn more"),
      },
    ];
    const systemMessage: SystemMessage = {
      type: "text",
      text: "Hey there! I'm Aura, your AI assistant. How can I help you today?",
      quickReplies,
    };

    const initialMessage: ChatMessage = {
      id: Date.now(),
      type: ChatMessageType.SYSTEM_MESSAGE,
      message: systemMessage,
    };

    setChatMessages([initialMessage]);

    document.addEventListener(
      Constant.Socket_Reciever_Event.AI_AGENT_MESSAGE,
      handleAiMessage
    );

    // Cleanup function: remove event listeners
    return () => {
      console.log("Chat cleanup........");
      document.removeEventListener(
        Constant.Socket_Reciever_Event.AI_AGENT_MESSAGE,
        handleAiMessage
      );

      setChatMessages([]);
    };
  }, []);

  const addMessage = (data: UserMessage) => {
    const newMessage: ChatMessage = {
      id: Date.now(),
      type: ChatMessageType.USER_MESSAGE,
      message: data,
    };

    console.log("addMessage", newMessage);
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    // socket.sendMessage({ message: text });
  };

  const handleIntentButtonClick = (aliasText: string) => {
    addMessage({ type: "text", text: aliasText });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f0f0",
      }}
    >
      <div className={styles.chatWidget}>
        <Header title="AI Chat Assistant" />
        <ConversationList
          messages={chatMessages}
          onIntentButtonClick={handleIntentButtonClick}
        />
        <ChatInput
          disabled={loader}
          onSendMessage={(text: string) => addMessage({ type: "text", text })}
        />
      </div>
    </div>
  );
};

export default Chat;
