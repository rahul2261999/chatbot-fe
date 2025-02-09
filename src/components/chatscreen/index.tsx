import React, { useEffect, useState } from "react";
import Header from "./Header";
import ConversationList from "./ConversationList";
import ChatInput from "./ChatInput";
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
import styled from "styled-components";

const ChatMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 30px;
  bottom: 20px;
  max-width: 450px;

  width: 100%;
  max-width: 450px;

  height: min(670px, 80vh);

  background: var(--purple-12);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--primary-box-shadow);
  margin: 1rem;

  @media (min-width: 1200px) {
    height: max(700px, 80vh);
  }

  /* Desktop */
  @media (min-width: 992px) and (max-width: 1199px) {
    height: min(670px, 80vh);
  }

  /* Tablet */
  @media (min-width: 768px) and (max-width: 991px) {
    max-width: 450px;
    height: max(550px, 80vh);
  }

  /* Large Mobile */
  @media (min-width: 481px) and (max-width: 767px) {
    max-width: 400px;
    height: max(500px, 85vh);
    margin: 0.5rem;
  }

  /* Small Mobile */
  @media (max-width: 480px) {
    height: 100vh;
    max-width: 100%;
    border-radius: 0;
    margin: 0;
    right: 0;
    bottom: 0;
  }

  /* Handle landscape mode on mobile */
  @media (max-height: 500px) and (orientation: landscape) {
    height: 100vh;
    max-width: 100%;
  }
`;

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
    <ChatMainContainer>
      <Header title="AI Chat Assistant" />
      <ConversationList
        messages={chatMessages}
        onIntentButtonClick={handleIntentButtonClick}
      />
      <ChatInput
        disabled={loader}
        onSendMessage={(text: string) => addMessage({ type: "text", text })}
      />
    </ChatMainContainer>
  );
};

export default Chat;
