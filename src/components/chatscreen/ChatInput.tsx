import React, { useState } from "react";
import styled from "styled-components";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

const ChatInputForm = styled.form`
  display: flex;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--purple-contrast);
  border-top: 1px solid var(--purple-6);
`;

const Input = styled.input`
  flex-grow: 1;
  padding: clamp(8px, 2vw, 12px) clamp(12px, 2vw, 16px);
  border: 1px solid var(--gray-6);
  border-radius: 24px;
  font-size: clamp(0.875rem, 2vw, 1rem);
  background: var(--purple-contrast);
  transition: all 0.3s ease;
  min-width: clamp(150px, 50%, 200px);
  color: var(--gray-11);
  outline-color: var(--purple-8);
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(40px, 8vw, 48px);
  height: clamp(40px, 8vw, 48px);
  margin-left: clamp(8px, 2vw, 12px);
  border: none;
  border-radius: 50%;
  background: var(--purple-9);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--primary-box-shadow);

  & > svg {
    transform: rotate(-35deg);
    transition: transform 0.2s ease-in;

    &:active {
      transform: translate(8px, -8px) rotate(-35deg);
    }
  }
`;

interface ChatInputProps {
  disabled: boolean;
  onSendMessage: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ disabled, onSendMessage }) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText("");
    }
  };

  return (
    <ChatInputForm onSubmit={handleSubmit}>
      <Input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your message..."
        aria-label="Chat input"
        disabled={disabled}
      />
      <SendButton disabled={disabled} type="submit" aria-label="Send message">
        <PaperPlaneIcon height={20} width={20}/>
      </SendButton>
    </ChatInputForm>
  );
};

export default ChatInput;
