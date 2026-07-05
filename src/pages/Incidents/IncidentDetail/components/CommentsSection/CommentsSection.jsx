import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import styles from './CommentsSection.module.css';

function formatTime(iso) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function CommentsSection({ comments = [], onAddComment }) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment?.(newComment.trim());
    setNewComment('');
    toast.success('Comment added');
  };

  return (
    <div className={styles.section}>
      {comments.length === 0 ? (
        <p className={styles.empty}>No comments yet. Be the first to add a work note.</p>
      ) : (
        <ul className={styles.list}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.comment}>
              <div className={styles.header}>
                <span className={styles.author}>{comment.author}</span>
                <span className={styles.role}>{comment.role}</span>
                <span className={styles.time}>{formatTime(comment.timestamp)}</span>
              </div>
              <p className={styles.content}>{comment.content}</p>
            </li>
          ))}
        </ul>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField
          label="Add a comment"
          placeholder="Work notes, investigation updates..."
          multiline
          minRows={3}
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!newComment.trim()}
          sx={{ alignSelf: 'flex-end', borderRadius: '4px', textTransform: 'none', boxShadow: 'none' }}
        >
          Post comment
        </Button>
      </form>
    </div>
  );
}

export default CommentsSection;
