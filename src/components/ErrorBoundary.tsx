import React from 'react'

class ErrorBoundary extends React.Component<
  {children: React.ReactNode},
  {hasError: boolean}
> {
  constructor(props: {children: React.ReactNode}) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError(error: any) {
    return {hasError: true, error}
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Log error to monitoring service if needed
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{color: 'red', padding: 24}}>
          Something went wrong. Please refresh the page.
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
