import React, { Component, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-4"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-red-500">⚠️</span>
            </div>
            <h2 className="text-2xl font-light text-gray-900 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-8">
              We encountered an unexpected error. Please try refreshing the
              page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#F04E23] text-white px-6 py-3 rounded-full font-light hover:bg-[#e67e22] transition-all"
            >
              Refresh Page
            </button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
