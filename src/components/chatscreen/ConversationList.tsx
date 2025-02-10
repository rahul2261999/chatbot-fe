import React, { useEffect, useRef } from "react";
import styles from "../../styles/ConversationList.module.css";
import {
  AiAgentMessage,
  ChatMessage,
  ChatMessageType,
  SystemMessage,
  UserMessage,
} from "@/types/chat.type";
import AiAgentMessageComp from "./AiAgentMessage";
import styled from "styled-components";

const MainContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: clamp(8px, 2vw, 16px);
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 2vw, 12px);
  background-color: var(--purple-contrast);

  /* Style for the scrollbar track */
  &::-webkit-scrollbar {
    width: 6px; /* Width of the scrollbar */
  }

  /* Style for the track (background of the scrollbar) */
  &::-webkit-scrollbar-track {
    background-color: var(--purple-3); /* Light background for track */
    border-radius: 10px;
  }

  /* Style for the scrollbar thumb */
  &::-webkit-scrollbar-thumb {
    background: var(--purple-9);
    border-radius: 10px;
  }

  /* Optional: Style for hover state */
  &::-webkit-scrollbar-thumb:hover {
    background: var(--purple-10);
  }
`;

const MessageContiner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  animation: fadeIn 0.3s ease-out;
`;

const UserMessageContainer = styled.div`
  max-width: 85%;
  align-self: flex-end;
  background: var(--purple-3);

  text-align: right;
  word-wrap: break-word;
  color: var(--gray-11);

  padding: clamp(8px, 2vw, 16px);
  border-radius: 12px;

  transition: transform 0.2s ease;

  &:hover {
    box-shadow: 0px 4px 8px var(--purple-4), 0px 1px 3px var(--gray-4);
  }
`;

const AiMessageContainer = styled.div`
  min-width: clamp(160px, 40%, 200px);
  max-width: 85%;
  align-self: flex-start;
  background-color: var(--purple-2);

  text-align: left;
  word-wrap: break-word;
  color: var(--gray-11);
  padding: clamp(8px, 2vw, 16px);
  border-radius: 12px;

  transition: transform 0.2s ease;

  &:hover {
    box-shadow: 0px 4px 8px var(--purple-4), 0px 1px 3px var(--gray-4);
  }
`;

const QuickReplyContainer = styled.div`
  margin: 0.5rem 0;
`;

const QuickReplyButton = styled.button`
  min-width: clamp(100px, 25%, 120px);
  padding: clamp(6px, 1.5vw, 8px) clamp(12px, 2vw, 16px);
  margin: 0.4rem;
  background: var(--purple-3);

  font-size: clamp(0.8rem, 2vw, 0.9rem);
  text-align: center;
  color: var(--gray-11);
  cursor: pointer;

  border: none;
  border-radius: 16px;
  box-shadow: 0px 2px 4px rgba(106, 13, 173, 0.2),
    0px 4px 10px rgba(106, 13, 173, 0.15);

  transition: all 0.2s ease;

  &:hover {
    background-color: var(--purple-4);
    color: var(--gray-12);
    transform: translateY(-2px);
  }
`;

interface ConversationListProps {
  messages: ChatMessage[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  messages,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const messageJsxElementList = messages.map(
    (message: ChatMessage, index: number) => {
      if (message.type === ChatMessageType.SYSTEM_MESSAGE) {
        const systemMessage = message.message as SystemMessage;
        const messageComponent = (
          <AiMessageContainer>{systemMessage.text}</AiMessageContainer>
        );

        let quickReplies = [];

        if (systemMessage.quickReplies && systemMessage.quickReplies.show) {
          quickReplies = systemMessage.quickReplies.buttons.map(
            (quickReply, index) => {
              return (
                <QuickReplyButton
                  key={`msg-${message.id}-quick-reply-${index}`}
                  onClick={() =>
                    quickReply.action(message.id, quickReply.intent)
                  }
                >
                  {quickReply.label}
                </QuickReplyButton>
              );
            }
          );
        }

        return (
          <MessageContiner key={index}>
            {messageComponent}
            {quickReplies && quickReplies.length > 0 ? (
              <QuickReplyContainer>{quickReplies}</QuickReplyContainer>
            ) : (
              <></>
            )}
          </MessageContiner>
        );
      } else if (message.type === ChatMessageType.AI_AGENT_MESSAGE) {
        const aiAgentMessage = message.message as AiAgentMessage;
        const messageComponent = (
          <AiMessageContainer>
            <AiAgentMessageComp
              id={message.id}
              key={message.id}
              message={message.message as AiAgentMessage}
            />
          </AiMessageContainer>
        );

        let quickReplies = [];

        if (aiAgentMessage.quickReplies && aiAgentMessage.quickReplies.show) {
          quickReplies = aiAgentMessage.quickReplies.buttons.map(
            (quickReply, index) => {
              return (
                <QuickReplyButton
                  key={`msg-${message.id}-quick-reply-${index}`}
                  onClick={() =>
                    quickReply.action(message.id, quickReply.intent)
                  }
                >
                  {quickReply.label}
                </QuickReplyButton>
              );
            }
          );
        }

        return (
          <MessageContiner key={message.id}>
            {messageComponent}
            {quickReplies && quickReplies.length > 0 ? (
              <QuickReplyContainer>{quickReplies}</QuickReplyContainer>
            ) : (
              <></>
            )}
          </MessageContiner>
        );
      } else {
        const userMessage = message.message as UserMessage;

        return (
          <MessageContiner key={message.id}>
            <UserMessageContainer>{userMessage.text}</UserMessageContainer>
          </MessageContiner>
        );
      }
    }
  );

  return (
    <MainContainer>
      {messageJsxElementList}
      <div ref={messagesEndRef} />
    </MainContainer>
  );
};

export default ConversationList;
