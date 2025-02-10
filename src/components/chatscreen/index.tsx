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
import styled, { keyframes } from "styled-components";
import ChatWidget from "./ChatWidget";
import socket from "@helper/socket/socket";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ChatMainContainer = styled.div<{ isopen: boolean }>`
  display: flex;
  flex-direction: column;

  position: fixed;
  right: 30px;
  bottom: 50px;
  z-index: 1001;

  max-width: 450px;
  width: 100%;
  max-width: 450px;

  height: min(670px, 80vh);

  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--primary-box-shadow);
  margin: 1rem;

  animation: ${fadeInUp} 0.3s ease-in-out;

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
  const [chatWidget, setChatWidget] = useState<boolean>(false);
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
    socket.init();
    connectEventHandler();
    const quickReplies: QuickReplyButton[] = [
      {
        label: "What Is Psoriasis",
        intent: "What Is Psoriasis",
        action: (messageId: number, intent: string) =>
          handleIntentButtonClick(messageId, intent),
      },
      {
        label: "Psoriasis Symptoms",
        intent: "Signs and Symptoms of Psoriasis",
        action: (messageId: number, intent: string) =>
          handleIntentButtonClick(messageId, intent),
      },
      {
        label: "Types of Psoriasis",
        intent: "I want to know the types of Psoriasis",
        action: (messageId: number, intent: string) =>
          handleIntentButtonClick(messageId, intent),
      },
      {
        label: "Tell me about the treatment",
        intent:
          "I want to learn about treatment and medication options for Psoriasis",
        action: (messageId: number, intent: string) =>
          handleIntentButtonClick(messageId, intent),
      },
    ];

    const systemMessage: SystemMessage = {
      type: "text",
      text: "Hey there! I'm Aura, your AI assistant. How can I help you today?",
      quickReplies: {
        show: true,
        buttons: quickReplies,
      },
    };

    const initialMessage: ChatMessage = {
      id: Date.now(),
      type: ChatMessageType.SYSTEM_MESSAGE,
      message: systemMessage,
    };

    setChatMessages([initialMessage]);
    setChatWidget(false);

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
      setChatWidget(false);
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
    socket.sendMessage({ message: data.text });
  };

  const handleIntentButtonClick = (messageId: number, intent: string) => {
    setChatMessages((prevState) => {
      const newMessageList = prevState.map((chatMessage) => {
        if (
          chatMessage.id === messageId &&
          "quickReplies" in chatMessage.message
        ) {
          return {
            ...chatMessage,
            message: {
              ...chatMessage.message,
              quickReplies: {
                ...chatMessage.message.quickReplies,
                show: false,
              },
            },
          };
        }
        return chatMessage;
      });

      const newMessage: ChatMessage = {
        id: Date.now(),
        type: ChatMessageType.USER_MESSAGE,
        message: {
          type: "text",
          text: intent,
        },
      };

      newMessageList.push(newMessage);

      return newMessageList;
    });

    socket.sendMessage({
      message: intent
    });
  };

  return (
    <>
      {chatWidget && (
        <ChatMainContainer isopen={chatWidget}>
          <Header title="Aura" />
          <ConversationList messages={loader ? [] : chatMessages} />
          <ChatInput
            disabled={loader}
            onSendMessage={(text: string) => addMessage({ type: "text", text })}
          />
        </ChatMainContainer>
      )}
      <ChatWidget
        chatWidget={chatWidget}
        toggleChatWidget={() => setChatWidget(!chatWidget)}
      />
    </>
  );
};

export default Chat;
