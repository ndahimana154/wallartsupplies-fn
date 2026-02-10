import React from 'react';
import { Link } from 'react-router-dom';

interface State {
  hasError: boolean;
  error?: Error | null;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  State
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch() {
    // Error info is available if needed for logging/monitoring
    // Could be used to send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
          <div className="max-w-lg text-center bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              An unexpected error occurred. Try refreshing the page or go back
              to the homepage.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded bg-[#e67e22] text-white hover:bg-[#cf711f] transition"
              >
                Refresh
              </button>
              <Link to="/" className="text-sm text-gray-700 underline">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
