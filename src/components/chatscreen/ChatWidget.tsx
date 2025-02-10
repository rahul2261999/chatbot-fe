import { ChatBubbleIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import React from "react";
import styled, { keyframes } from "styled-components";

const rotetRightToBottom = keyframes`
  from {
    opacity: 0;
    transform: rotate(0);
  }
  to {
    opacity: 1;
    transform: rotate(90deg);
  }
`;

const ChatWidgetCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 45px;
  width: 45px;
  background-color: var(--purple-10);
  border-radius: 50%;
  cursor: pointer;

  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;

  &:hover {
    box-shadow: var(--primary-box-shadow);
  }
`;

const ChatWidgetIcon = styled(ChatBubbleIcon)`
  height: 100%;
  width: 100%;
  color: var(--gray-11);
  padding: 0.5rem;
`;

const ChatWidgetChervonDown = styled(ChevronRightIcon)`
  height: 100%;
  width: 100%;
  color: var(--gray-11);
  padding: 0.5rem;
  
  animation: ${rotetRightToBottom} 0.3s ease-in forwards;
`;

interface ChatWidgetProps {
  chatWidget: boolean;
  toggleChatWidget: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = (props: ChatWidgetProps) => {
  return (
    <ChatWidgetCircle onClick={() => props.toggleChatWidget()}>
      {props.chatWidget ? <ChatWidgetChervonDown /> : <ChatWidgetIcon />}
    </ChatWidgetCircle>
  );
};

export default ChatWidget;
