import { Component } from 'react';
import ErrorState from '@/components/common/ErrorState';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallbackTitle, fallbackMessage } = this.props;

    if (hasError) {
      return (
        <ErrorState
          title={fallbackTitle || 'Something went wrong'}
          message={
            fallbackMessage ||
            error?.message ||
            'An unexpected error occurred while rendering this page.'
          }
          onRetry={this.handleReset}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
