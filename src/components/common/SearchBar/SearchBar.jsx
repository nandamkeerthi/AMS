import { FiSearch } from 'react-icons/fi';
import styles from './SearchBar.module.css';

/**
 * Reusable search input with icon.
 */
function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  fullWidth = false,
  compact = false,
  ariaLabel = 'Search',
}) {
  return (
    <div
      className={`${styles.searchBar} ${fullWidth ? styles.fullWidth : ''} ${compact ? styles.compact : ''}`}
      role="search"
    >
      <FiSearch className={styles.searchIcon} size={18} aria-hidden="true" />
      <input
        type="search"
        className={styles.input}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
    </div>
  );
}

export default SearchBar;
