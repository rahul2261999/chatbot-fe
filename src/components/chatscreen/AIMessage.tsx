import React from "react";
import styles from "../../styles/AIMessage.module.css";

export interface SessionInfo {
  sessionId: string;
}

export enum ListType {
  ordered = "ordered",
  unordered = "unordered",
}

export interface IList {
  type: ListType;
  heading: string;
  children: string[];
}
export interface ChatCompletionMessage {
  heading: string;
  subheading: string;
  paragraph: string;
  list: IList;
}

export interface IntentButton {
  label: string;
  action: () => void;
  aliasText: string;
}

export interface AIMessageRes {
  sessionInfo: SessionInfo | null;
  message: Partial<ChatCompletionMessage>[];
}

export interface AIMessageProps extends AIMessageRes {
  intentButtons?: IntentButton[];
}

const AIMessage: React.FC<{ id: string; data: AIMessageProps }> = (props) => {
  
  const aIListMessage = (data: IList) => {
    const list =
      data.type === ListType.ordered ? (
        <ol className={styles.orderedList}>
          {data.children &&
            data.children.map((child, index) => <li key={index}>{child}</li>)}
        </ol>
      ) : (
        <ul className={styles.unorderedList}>
          {data.children &&
            data.children.map((child, index) => <li key={index}>{child}</li>)}
        </ul>
      );
    return (
      <>
        {data.heading && data.heading.length && (
          <div className={styles.heading}>{data.heading}</div>
        )}
        {list}
      </>
    );
  };

  const messages: React.ReactElement[] = props.data.message.map(
    (message, index) => {
      return (
        <div className={styles.aiMessage} key={props.id + index}>
          {message.heading && message.heading.length && (
            <div className={styles.heading}>{message.heading}</div>
          )}
          {message.subheading && message.subheading.length && (
            <div className={styles.subheading}>{message.subheading}</div>
          )}
          {message.paragraph && message.paragraph.length && (
            <div className={styles.paragraph}>{message.paragraph}</div>
          )}
          {message.list && aIListMessage(message.list)}
        </div>
      );
    }
  );

  return <>{messages}</>;
};

export default AIMessage;
