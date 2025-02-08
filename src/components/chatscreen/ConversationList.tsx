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

interface ConversationListProps {
  messages: ChatMessage[];
  onIntentButtonClick: (aliasText: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  messages,
  onIntentButtonClick,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const messageJsxElementList = messages.map((message: ChatMessage) => {
    if (message.type === ChatMessageType.SYSTEM_MESSAGE) {
      const systemMessage = message.message as SystemMessage;
      const messageComponent = (
        <div className={`${styles.message} ${styles.aiMessage}`}>
          {systemMessage.text}
        </div>
      );

      const quickReplies = systemMessage.quickReplies?.map(
        (quickReply, index) => {
          return (
            <button
              key={`msg-${message.id}-quick-reply-${index}`}
              onClick={() => onIntentButtonClick(quickReply.intent)}
              className={styles.intentButton}
            >
              {quickReply.label}
            </button>
          );
        }
      );

      return (
        <div key={message.id} className={styles.messageContainer}>
          {messageComponent}
          {quickReplies && quickReplies.length > 0 ? quickReplies : <></>}
        </div>
      );
    } else if (message.type === ChatMessageType.AI_AGENT_MESSAGE) {
      const aiAgentMessage = message.message as AiAgentMessage;
      const messageComponent = (
        <div className={`${styles.message} ${styles.aiMessage}`}>
          <AiAgentMessageComp
            id={message.id}
            key={message.id}
            message={message.message as AiAgentMessage}
          />
        </div>
      );

      const quickReplies = aiAgentMessage.quickReplies?.map(
        (quickReply, index) => {
          return (
            <button
              key={`msg-${message.id}-quick-reply-${index}`}
              onClick={() => onIntentButtonClick(quickReply.intent)}
              className={styles.intentButton}
            >
              {quickReply.label}
            </button>
          );
        }
      );

      return (
        <div key={message.id} className={styles.messageContainer}>
          {messageComponent}
          {quickReplies && quickReplies.length > 0 ? quickReplies : <></>}
        </div>
      );
    } else {
      const userMessage = message.message as UserMessage;

      return (
        <div key={message.id} className={styles.messageContainer}>
          <div className={`${styles.message} ${styles.userMessage}`}>
            {userMessage.text}
          </div>
        </div>
      );
    }
  });

  return (
    <div className={styles.conversationList}>
      {messageJsxElementList}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ConversationList;
