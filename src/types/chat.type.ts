import { AiAgentResponse, ChatResponse } from "./socket.type";

export enum ChatMessageType {
  USER_MESSAGE = 'USER_MESSAGE',
  AI_AGENT_MESSAGE = 'AI_Agent_MESSAGE',
  SYSTEM_MESSAGE = 'SYSTEM_MESSAGE',
  LIVE_AGENT_MESSAGE = 'LIVE_AGENT_MESSAGE'
}

export interface SystemMessage {
  type: 'text',
  text: string;
  quickReplies?: quickReplies;
}

export interface quickReplies {
  show: boolean;
  buttons: QuickReplyButton[];
}

export interface QuickReplyButton {
  label: string;
  intent: string;
  action: (messageId: number, intent: string) => void;
}

export interface UserMessage {
  type: 'text',
  text: string;
}

export interface AiAgentMessage {
  message: ChatResponse,
  quickReplies?: quickReplies
}

export interface ChatMessage {
  id: number;
  type: ChatMessageType;
  message: SystemMessage | UserMessage | AiAgentMessage;
}