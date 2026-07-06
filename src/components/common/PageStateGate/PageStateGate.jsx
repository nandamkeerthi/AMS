import { ErrorState, SkeletonLoader } from '@/components/common';
import styles from './PageStateGate.module.css';

/**
 * Handles common async page states: loading, error, and missing data.
 */
function PageStateGate({
  loading,
  error,
  hasData = true,
  onRetry,
  title,
  message,
  className = '',
  children,
}) {
  if (loading) {
    return (
      <div className={`${styles.wrapper} ${className}`}>
        <SkeletonLoader variant="page" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title={title || 'Unable to load content'}
        message={error}
        onRetry={onRetry}
      />
    );
  }

  if (!hasData) {
    return (
      <ErrorState
        title={title || 'No data available'}
        message={message || 'Content could not be loaded.'}
        onRetry={onRetry}
      />
    );
  }

  return children;
}

export default PageStateGate;
