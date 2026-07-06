import { GlassCard, EmptyState } from '@/components/common';
import { formatShortDate } from '@/utils/format';
import styles from './ConversationHistoryPanel.module.css';

function ConversationHistoryPanel({
  conversations = [],
  activeId,
  onSelect,
}) {
  if (!conversations.length) {
    return (
      <GlassCard title="Conversation History" variant="solid">
        <EmptyState
          compact
          title="No conversations yet"
          description="Previous AI assistant sessions will appear here."
        />
      </GlassCard>
    );
  }

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
                {formatShortDate(conv.timestamp)} · {conv.messageCount} messages
              </span>
            </button>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}

export default ConversationHistoryPanel;
