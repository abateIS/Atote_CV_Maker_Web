import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    height: '100vh', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    background: '#0f172a', color: '#fff', padding: 20, textAlign: 'center'
                }}>
                    <h1 style={{ marginBottom: 16 }}>Something went wrong.</h1>
                    <p style={{ color: '#94a3b8', marginBottom: 24 }}>{this.state.error?.message || 'An unexpected error occurred.'}</p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            background: '#6366f1', color: '#fff', border: 'none',
                            padding: '12px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 600
                        }}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
