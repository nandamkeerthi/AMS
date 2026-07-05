import styles from './KnowledgeSortBar.module.css';

const SORT_OPTIONS = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'most_viewed', label: 'Most Viewed' },
  { id: 'recently_updated', label: 'Recently Updated' },
];

function KnowledgeSortBar({ sortBy = 'relevance', onSortChange, resultCount = 0 }) {
  return (
    <div className={styles.bar} role="toolbar" aria-label="Sort articles">
      <span className={styles.resultCount}>
        {resultCount} article{resultCount === 1 ? '' : 's'}
      </span>
      <div className={styles.sortGroup}>
        <span className={styles.sortLabel}>Sort by:</span>
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`${styles.sortBtn} ${sortBy === option.id ? styles.sortBtnActive : ''}`}
            onClick={() => onSortChange?.(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default KnowledgeSortBar;
