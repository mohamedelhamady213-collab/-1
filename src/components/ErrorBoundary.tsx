import { Component } from 'react';
import type { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('Unhandled error in app:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '2rem',
            background: '#0b1220',
            color: '#f7f7f7',
          }}
        >
          <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>حدث خطأ غير متوقع</h1>
          <p style={{ maxWidth: '30rem', lineHeight: 1.6 }}>يبدو أن بعض وظائف الصفحة لم تعمل بشكل صحيح. الرجاء إعادة تحميل الصفحة، وإذا استمرت المشكلة فأخبرني لأصلحها.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
