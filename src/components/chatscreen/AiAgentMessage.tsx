import React from "react";
import styles from "../../styles/AIMessage.module.css";
import { AiAgentMessage, ChatMessage } from "@/types/chat.type";
import {
  Heading,
  OrderedList,
  Paragraph,
  UnorderedList,
} from "@/types/socket.type";

interface AiAgentMessageProps {
  id: ChatMessage["id"];
  message: AiAgentMessage;
}

const AiAgentMessages: React.FC<AiAgentMessageProps> = (
  props: AiAgentMessageProps
) => {
  const messageJsxElementList = props.message.message.map((msg, index) => {
    if (msg.type === "h1") {
      const headingMessage = msg as Heading;

      return <div className={styles.heading}>{headingMessage.text}</div>;
    } else if (msg.type === "paragraph") {
      const paragraphMessage = msg as Paragraph;

      return <div className={styles.paragraph}>{paragraphMessage.text}</div>;
    } else if (msg.type == "ordered") {
      const listMessage = msg as OrderedList;

      return (
        <ol className={styles.orderedList}>
          {listMessage.listItem &&
            listMessage.listItem.map((child, index) => (
              <li key={index}>{child}</li>
            ))}
        </ol>
      );
    } else if (msg.type === "unordered") {
      const listMessage = msg as UnorderedList;

      return (
        <ul className={styles.unorderedList}>
          {listMessage.listItem &&
            listMessage.listItem.map((child, index) => (
              <li key={index}>{child}</li>
            ))}
        </ul>
      );
    }
  });
  return <>{messageJsxElementList}</>;
};

export default AiAgentMessages;
