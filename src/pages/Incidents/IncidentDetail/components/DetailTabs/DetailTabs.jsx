import styles from './DetailTabs.module.css';

function DetailTabs({ tabs, activeTab, onChange, children }) {
  return (
    <div>
      <div className={styles.tabs} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.panel} role="tabpanel">
        {children}
      </div>
    </div>
  );
}

export default DetailTabs;
