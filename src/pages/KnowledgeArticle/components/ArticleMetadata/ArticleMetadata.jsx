import { Chip } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { StatusBadge } from '@/components/common';
import styles from './ArticleMetadata.module.css';

function ArticleMetadata({ metadata }) {
  if (!metadata) return null;

  return (
    <div className={styles.metadata}>
      <div className={styles.badges}>
        <Chip label={metadata.category} size="small" variant="outlined" className={styles.chip} />
        <StatusBadge status={metadata.status === 'published' ? 'resolved' : 'open'} />
      </div>

      <dl className={styles.grid}>
        <div className={styles.item}>
          <dt>Application</dt>
          <dd>{metadata.application}</dd>
        </div>
        <div className={styles.item}>
          <dt>Author</dt>
          <dd>{metadata.author}</dd>
        </div>
        <div className={styles.item}>
          <dt>Last updated</dt>
          <dd>{new Date(metadata.lastUpdated).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
          })}</dd>
        </div>
        <div className={styles.item}>
          <dt>Version</dt>
          <dd>{metadata.version}</dd>
        </div>
        <div className={styles.item}>
          <dt>Views</dt>
          <dd className={styles.views}>
            <VisibilityOutlinedIcon fontSize="inherit" />
            {metadata.viewCount.toLocaleString()}
          </dd>
        </div>
        <div className={styles.item}>
          <dt>Published</dt>
          <dd>{new Date(metadata.publishedAt).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
          })}</dd>
        </div>
      </dl>

      {metadata.tags?.length > 0 && (
        <div className={styles.tags}>
          {metadata.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" className={styles.tag} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ArticleMetadata;
