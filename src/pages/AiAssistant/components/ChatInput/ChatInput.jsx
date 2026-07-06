import { useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import styles from './ChatInput.module.css';

function ChatInput({ onSend, disabled = false, placeholder = 'Ask the AI assistant...' }) {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = value.trim();
    if (!text || disabled) return;
    onSend?.(text);
    setValue('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        multiline
        maxRows={4}
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={styles.input}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px', background: 'var(--color-surface)' } }}
        aria-label="Message input"
      />
      <IconButton
        type="submit"
        color="primary"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className={styles.sendBtn}
      >
        <SendOutlinedIcon />
      </IconButton>
    </form>
  );
}

export function SuggestedPromptChips({ prompts = [], onSelect, disabled = false }) {
  if (!prompts.length) return null;

  return (
    <div className={styles.chips} role="group" aria-label="Suggested questions">
      {prompts.map((prompt) => (
        <Button
          key={prompt}
          type="button"
          size="small"
          variant="outlined"
          disabled={disabled}
          onClick={() => onSelect?.(prompt)}
          className={styles.chip}
        >
          {prompt}
        </Button>
      ))}
    </div>
  );
}

export default ChatInput;
