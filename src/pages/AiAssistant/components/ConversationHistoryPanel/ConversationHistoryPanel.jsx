import { GlassCard } from '@/components/common';
import styles from './ConversationHistoryPanel.module.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function ConversationHistoryPanel({
  conversations = [],
  activeId,
  onSelect,
}) {
  if (!conversations.length) return null;

  return (
    <GlassCard title="Conversation History" variant="solid">
      <ul className={styles.list}>
        {conversations.map((conv) => (
          <li key={conv.id}>
            <button
              type="button"
              className={`${styles.item} ${activeId === conv.id ? styles.itemActive : ''}`}
              onClick={() => onSelect?.(conv.id)}
            >
              <span className={styles.title}>{conv.title}</span>
              <span className={styles.preview}>{conv.preview}</span>
              <span className={styles.meta}>
                {formatDate(conv.timestamp)} · {conv.messageCount} messages
              </span>
            </button>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}

export default ConversationHistoryPanel;
