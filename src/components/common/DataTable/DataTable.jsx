import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import EmptyState from '@/components/common/EmptyState';
import styles from './DataTable.module.css';

/**
 * Reusable data table with sorting, hover states, and empty state.
 */
function DataTable({
  columns,
  data,
  onRowClick,
  sortKey,
  sortDirection,
  onSort,
  emptyTitle = 'No records found',
  emptyDescription = 'There are no items to display.',
  getRowKey = (row, index) => row.id || index,
}) {
  const handleSort = (column) => {
    if (!column.sortable || !onSort) return;
    onSort(column.key);
  };

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        compact
      />
    );
  }

  return (
    <div className={styles.tableWrapper} role="region" aria-label="Data table">
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={column.sortable ? styles.sortable : undefined}
                onClick={() => handleSort(column)}
                scope="col"
                style={column.width ? { width: column.width } : undefined}
                aria-sort={
                  sortKey === column.key
                    ? sortDirection === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : undefined
                }
              >
                {column.label}
                {column.sortable && sortKey === column.key && (
                  <span className={`${styles.sortIcon} ${styles.sortIconActive}`} aria-hidden="true">
                    {sortDirection === 'asc' ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={getRowKey(row, index)}
              className={onRowClick ? styles.clickable : undefined}
              onClick={() => onRowClick?.(row)}
              tabIndex={onRowClick ? 0 : undefined}
              onKeyDown={
                onRowClick
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onRowClick(row);
                      }
                    }
                  : undefined
              }
            >
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
