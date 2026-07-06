import { memo } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { CircularProgress } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import EmptyState from '@/components/common/EmptyState';
import { formatDateTime, formatShortDate } from '@/utils/format';
import styles from './IncidentTimeline.module.css';

const EVENT_CONFIG = {
  created: {
    label: 'Incident Created',
    icon: AddCircleOutlineIcon,
    dotColor: 'primary',
  },
  assigned: {
    label: 'Assigned',
    icon: PersonOutlineIcon,
    dotColor: 'info',
  },
  ai_analysis: {
    label: 'AI Analysis Completed',
    icon: PsychologyIcon,
    dotColor: 'secondary',
  },
  comment: {
    label: 'Engineer Comment',
    icon: ChatBubbleOutlineIcon,
    dotColor: 'primary',
  },
  resolution_started: {
    label: 'Resolution Started',
    icon: BuildCircleOutlinedIcon,
    dotColor: 'warning',
  },
  resolved: {
    label: 'Resolved',
    icon: CheckCircleOutlineIcon,
    dotColor: 'success',
  },
  knowledge_article: {
    label: 'Knowledge Article Generated',
    icon: MenuBookOutlinedIcon,
    dotColor: 'info',
  },
};

function formatTimestamp(iso) {
  return formatDateTime(iso);
}

function formatShortTime(iso) {
  return formatShortDate(iso);
}

/**
 * Reusable incident timeline using MUI Lab Timeline.
 * @param {Object} props
 * @param {Array} props.events - Timeline events ({ id, type, title?, description, author, timestamp })
 * @param {boolean} [props.loading]
 * @param {string} [props.emptyTitle]
 * @param {string} [props.emptyDescription]
 */
function IncidentTimeline({
  events = [],
  loading = false,
  emptyTitle = 'No timeline events',
  emptyDescription = 'Activity for this incident will appear here.',
}) {
  if (loading) {
    return (
      <div className={styles.loading} role="status" aria-label="Loading timeline">
        <CircularProgress size={32} />
      </div>
    );
  }

  if (!events.length) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        compact
      />
    );
  }

  return (
    <Timeline
      position="right"
      className={styles.timeline}
      aria-label="Incident activity timeline"
    >
      {events.map((event, index) => {
        const config = EVENT_CONFIG[event.type] || EVENT_CONFIG.created;
        const Icon = config.icon;
        const isLast = index === events.length - 1;
        const title = event.title || config.label;

        return (
          <TimelineItem key={event.id}>
            <TimelineOppositeContent
              className={styles.opposite}
              color="text.secondary"
            >
              <span className={styles.timeText}>{formatShortTime(event.timestamp)}</span>
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot color={config.dotColor} variant="filled">
                <Icon className={styles.dotIcon} aria-hidden="true" />
              </TimelineDot>
              {!isLast && <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent className={styles.content}>
              <article className={styles.card}>
                <h4 className={styles.eventTitle}>{title}</h4>
                {event.description && (
                  <p className={styles.description}>{event.description}</p>
                )}
                {event.author && (
                  <span className={styles.author}>{event.author}</span>
                )}
                <time
                  className={styles.mobileTime}
                  dateTime={event.timestamp}
                >
                  {formatTimestamp(event.timestamp)}
                </time>
              </article>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}

export default memo(IncidentTimeline);
