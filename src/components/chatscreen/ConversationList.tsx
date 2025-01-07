import React, { useEffect, useRef } from "react";
import { Message } from "./ChatWidget";
import AIMessage from "./AIMessage";
import styles from "../../styles/ConversationList.module.css";

interface ConversationListProps {
  messages: Message[];
  onIntentButtonClick: (intent: string, aliasText: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  messages,
  onIntentButtonClick,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.conversationList}>
      {messages.map((message) => (
        <div key={message.id} className={styles.messageContainer}>
          <div
            className={`${styles.message} ${
              message.isAI ? styles.aiMessage : styles.userMessage
            }`}
          >
            {message.isAI ? (
              <AIMessage
                id={message.id}
                data={{
                  message: message.aiMessage?.message || [],
                  sessionInfo: message.aiMessage?.sessionInfo || null,
                  intentButtons: message.aiMessage?.intentButtons || [],
                }}
              />
            ) : (
              message.userMessage?.text
            )}
          </div>
          {message.isAI &&
            message.aiMessage &&
            message.aiMessage.intentButtons &&
            message.aiMessage.intentButtons.length > 0 && (
              <div className={styles.intentButtons}>
                {message.aiMessage.intentButtons.map((button, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      onIntentButtonClick(button.label, button.aliasText)
                    }
                    className={styles.intentButton}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ConversationList;
