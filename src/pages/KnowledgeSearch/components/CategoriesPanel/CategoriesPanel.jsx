import styles from './CategoriesPanel.module.css';

function CategoriesPanel({ categories = [], activeId = 'all', onSelect }) {
  return (
    <nav className={styles.panel} aria-label="Knowledge categories">
      <h3 className={styles.title}>Categories</h3>
      <ul className={styles.list}>
        {categories.map((category) => (
          <li key={category.id}>
            <button
              type="button"
              className={`${styles.item} ${activeId === category.id ? styles.itemActive : ''}`}
              onClick={() => onSelect?.(category.id)}
            >
              <span className={styles.label}>{category.label}</span>
              <span className={styles.count}>{category.count}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CategoriesPanel;
