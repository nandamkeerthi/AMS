import styles from './IncidentViewTabs.module.css';

function IncidentViewTabs({ tabs, activeTab, onChange }) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Incident views">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const countClass = tab.critical
          ? styles.countCritical
          : '';

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={`${styles.count} ${countClass}`}>{tab.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default IncidentViewTabs;
