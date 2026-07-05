import { MenuItem, TextField } from '@mui/material';
import { SearchBar } from '@/components/common';
import styles from './KnowledgeFilterBar.module.css';

const selectSx = {
  '& .MuiOutlinedInput-root': { borderRadius: '4px', fontSize: '0.875rem' },
};

function KnowledgeFilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  application,
  onApplicationChange,
  tag,
  onTagChange,
  categoryOptions = [],
  applicationOptions = [],
  tagOptions = [],
}) {
  return (
    <div className={styles.filterBar} role="search">
      <div className={styles.searchWrap}>
        <SearchBar
          value={search}
          onChange={onSearchChange}
          placeholder="Search articles by title, tags, author, or ID..."
          fullWidth
          compact
          ariaLabel="Search knowledge articles"
        />
      </div>
      <TextField
        select
        size="small"
        label="Category"
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        className={styles.select}
        sx={selectSx}
        aria-label="Filter by category"
      >
        {categoryOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        size="small"
        label="Application"
        value={application}
        onChange={(event) => onApplicationChange(event.target.value)}
        className={styles.select}
        sx={selectSx}
        aria-label="Filter by application"
      >
        {applicationOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        size="small"
        label="Tags"
        value={tag}
        onChange={(event) => onTagChange(event.target.value)}
        className={styles.select}
        sx={selectSx}
        aria-label="Filter by tag"
      >
        {tagOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

export default KnowledgeFilterBar;
