import { useState } from 'react';
import { Chip, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './TagsInput.module.css';

function TagsInput({ value = [], onChange, suggestions = [], error }) {
  const [input, setInput] = useState('');

  const addTag = (tag) => {
    const normalized = tag.trim().toLowerCase();
    if (!normalized || value.includes(normalized)) return;
    onChange([...value, normalized]);
    setInput('');
  };

  const removeTag = (tag) => {
    onChange(value.filter((item) => item !== tag));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag(input);
    }
  };

  const availableSuggestions = suggestions.filter((tag) => !value.includes(tag));

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputRow}>
        <TextField
          label="Add tag"
          placeholder="Type and press Enter"
          size="small"
          fullWidth
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          error={Boolean(error)}
          helperText={error?.message}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
        />
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => addTag(input)}
          aria-label="Add tag"
        >
          <AddIcon fontSize="small" />
        </button>
      </div>

      {value.length > 0 && (
        <div className={styles.tags}>
          {value.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              onDelete={() => removeTag(tag)}
              className={styles.chip}
            />
          ))}
        </div>
      )}

      {availableSuggestions.length > 0 && (
        <div className={styles.suggestions}>
          <span className={styles.suggestLabel}>Suggestions:</span>
          {availableSuggestions.slice(0, 6).map((tag) => (
            <button
              key={tag}
              type="button"
              className={styles.suggestBtn}
              onClick={() => addTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TagsInput;
