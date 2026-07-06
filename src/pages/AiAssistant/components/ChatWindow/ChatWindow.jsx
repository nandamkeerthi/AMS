import { useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ChatMessage from '../ChatMessage';
import TypingIndicator from '../TypingIndicator';
import ChatInput, { SuggestedPromptChips } from '../ChatInput';
import styles from './ChatWindow.module.css';

function ChatWindow({
  messages = [],
  isTyping = false,
  suggestedQuestions = [],
  onSend,
  onClear,
  inputDisabled = false,
}) {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className={styles.window}>
      <div className={styles.toolbar}>
        <span className={styles.toolbarTitle}>Chat</span>
        <Button
          type="button"
          size="small"
          variant="outlined"
          startIcon={<DeleteOutlineIcon />}
          onClick={onClear}
          disabled={messages.length <= 1 && !isTyping}
          className={styles.clearBtn}
        >
          Clear conversation
        </Button>
      </div>

      <div className={styles.messages} ref={containerRef} role="log" aria-label="Chat messages">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <SuggestedPromptChips
        prompts={suggestedQuestions}
        onSelect={onSend}
        disabled={inputDisabled || isTyping}
      />

      <ChatInput onSend={onSend} disabled={inputDisabled || isTyping} />
    </div>
  );
}

export default ChatWindow;
