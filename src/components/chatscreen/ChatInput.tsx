import React, { useState } from 'react'
import { Send } from 'lucide-react'
import styles from '../../styles/ChatInput.module.css'

interface ChatInputProps {
  disabled: boolean
  onSendMessage: (text: string) => void
}

const ChatInput: React.FC<ChatInputProps> = ({ disabled, onSendMessage }) => {
  const [inputText, setInputText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputText.trim()) {
      onSendMessage(inputText)
      setInputText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.chatInput}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your message..."
        className={styles.input}
        aria-label="Chat input"
        disabled={disabled}
      />
      <button disabled={disabled} type="submit" className={styles.sendButton} aria-label="Send message">
        <Send size={20} />
      </button>
    </form>
  )
}

export default ChatInput

