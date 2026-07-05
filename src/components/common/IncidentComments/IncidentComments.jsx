import { useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import toast from 'react-hot-toast';
import EmptyState from '../EmptyState';
import styles from './IncidentComments.module.css';

const DEFAULT_CURRENT_USER = {
  name: 'Jane Doe',
  role: 'Support Lead',
  initials: 'JD',
};

function formatTime(iso) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function normalizeComment(entry) {
  return {
    id: entry.id,
    engineerName: entry.engineerName || entry.author || 'Unknown',
    role: entry.role,
    initials: entry.initials || getInitials(entry.engineerName || entry.author),
    avatarColor: entry.avatarColor,
    comment: entry.comment || entry.content || '',
    timestamp: entry.timestamp,
    attachments: entry.attachments || [],
  };
}

/**
 * Reusable incident comments list with compose form.
 * @param {Object} props
 * @param {Array} props.comments
 * @param {Object} [props.currentUser]
 * @param {boolean} [props.loading]
 * @param {Function} [props.onSendComment] - (payload) => void; payload: { comment, attachments }
 */
function IncidentComments({
  comments: commentsProp = [],
  currentUser = DEFAULT_CURRENT_USER,
  loading = false,
  onSendComment,
}) {
  const fileInputRef = useRef(null);
  const [draft, setDraft] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [localComments, setLocalComments] = useState([]);

  const comments = [...commentsProp.map(normalizeComment), ...localComments];

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    setAttachments((prev) => [...prev, ...files]);
    toast.success(
      files.length === 1
        ? `Attached ${files[0].name}`
        : `${files.length} files attached`
    );
    event.target.value = '';
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;

    const attachmentMeta = attachments.map((file, index) => ({
      id: `local-att-${Date.now()}-${index}`,
      name: file.name,
      size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
    }));

    const payload = {
      comment: text,
      attachments: attachmentMeta,
    };

    if (onSendComment) {
      onSendComment(payload);
    } else {
      setLocalComments((prev) => [
        ...prev,
        normalizeComment({
          id: `local-${Date.now()}`,
          engineerName: currentUser.name,
          role: currentUser.role,
          initials: currentUser.initials || getInitials(currentUser.name),
          avatarColor: '#005a9e',
          comment: text,
          timestamp: new Date().toISOString(),
          attachments: attachmentMeta,
        }),
      ]);
    }

    setDraft('');
    setAttachments([]);
    toast.success('Comment sent');
  };

  if (loading) {
    return (
      <div className={styles.loading} role="status" aria-label="Loading comments">
        <CircularProgress size={32} />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {comments.length === 0 ? (
        <EmptyState
          title="No comments yet"
          description="Work notes and investigation updates will appear here."
          compact
        />
      ) : (
        <Stack component="ul" className={styles.list} spacing={2} aria-label="Incident comments">
          {comments.map((entry) => (
            <Box component="li" key={entry.id} className={styles.commentItem}>
              <Avatar
                className={styles.avatar}
                sx={{ bgcolor: entry.avatarColor || 'primary.main' }}
                aria-hidden="true"
              >
                {entry.initials}
              </Avatar>

              <article className={styles.commentBody}>
                <header className={styles.commentHeader}>
                  <Typography component="span" className={styles.engineerName}>
                    {entry.engineerName}
                  </Typography>
                  {entry.role && (
                    <Typography component="span" className={styles.role}>
                      {entry.role}
                    </Typography>
                  )}
                  <Typography component="time" className={styles.time} dateTime={entry.timestamp}>
                    {formatTime(entry.timestamp)}
                  </Typography>
                </header>

                <Typography component="p" className={styles.commentText}>
                  {entry.comment}
                </Typography>

                {entry.attachments?.length > 0 && (
                  <Stack direction="row" flexWrap="wrap" gap={1} className={styles.attachments}>
                    {entry.attachments.map((file) => (
                      <Chip
                        key={file.id || file.name}
                        size="small"
                        icon={<AttachFileOutlinedIcon />}
                        label={`${file.name}${file.size ? ` (${file.size})` : ''}`}
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                )}
              </article>
            </Box>
          ))}
        </Stack>
      )}

      <Box component="section" className={styles.compose} aria-label="Add comment">
        <TextField
          label="Add a comment"
          placeholder="Work notes, investigation updates..."
          multiline
          minRows={3}
          fullWidth
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className={styles.textField}
        />

        {attachments.length > 0 && (
          <Stack direction="row" flexWrap="wrap" gap={1} className={styles.pendingAttachments}>
            {attachments.map((file, index) => (
              <Chip
                key={`${file.name}-${index}`}
                size="small"
                label={file.name}
                onDelete={() => removeAttachment(index)}
                variant="outlined"
              />
            ))}
          </Stack>
        )}

        <Stack direction="row" className={styles.actions} spacing={1}>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            hidden
            onChange={handleFileChange}
            aria-hidden="true"
          />
          <Button
            type="button"
            variant="outlined"
            startIcon={<AttachFileOutlinedIcon />}
            onClick={handleAttachClick}
            className={styles.attachButton}
          >
            Attach file
          </Button>
          <Button
            type="button"
            variant="contained"
            endIcon={<SendOutlinedIcon />}
            disabled={!draft.trim()}
            onClick={handleSend}
            className={styles.sendButton}
          >
            Send
          </Button>
        </Stack>
      </Box>
    </div>
  );
}

export default IncidentComments;
