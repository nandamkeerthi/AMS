import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import toast from 'react-hot-toast';
import { GlassCard } from '@/components/common';
import styles from './FeedbackPanel.module.css';

function FeedbackPanel() {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!rating) {
      toast.error('Please select helpful or not helpful');
      return;
    }
    setSubmitted(true);
    toast.success('Thank you for your feedback');
  };

  if (submitted) {
    return (
      <GlassCard title="Feedback" variant="solid">
        <p className={styles.thankYou}>Thank you for helping improve this article.</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard title="Feedback" subtitle="Was this article helpful?" variant="solid">
      <div className={styles.rating}>
        <button
          type="button"
          className={`${styles.ratingBtn} ${rating === 'up' ? styles.ratingBtnActive : ''}`}
          onClick={() => setRating('up')}
          aria-label="Helpful"
        >
          <ThumbUpOutlinedIcon fontSize="small" />
          Helpful
        </button>
        <button
          type="button"
          className={`${styles.ratingBtn} ${rating === 'down' ? styles.ratingBtnActive : ''}`}
          onClick={() => setRating('down')}
          aria-label="Not helpful"
        >
          <ThumbDownOutlinedIcon fontSize="small" />
          Not helpful
        </button>
      </div>
      <TextField
        label="Additional comments (optional)"
        placeholder="Tell us how we can improve..."
        multiline
        minRows={2}
        fullWidth
        size="small"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        className={styles.commentField}
      />
      <Button
        variant="contained"
        size="small"
        onClick={handleSubmit}
        className={styles.submitBtn}
      >
        Submit feedback
      </Button>
    </GlassCard>
  );
}

export default FeedbackPanel;
