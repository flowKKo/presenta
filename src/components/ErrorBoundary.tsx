import { Component, type ReactNode } from 'react'
import { colors } from '../theme/swiss'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  /** Compact mode for blocks/diagrams — shows inline error instead of full card */
  compact?: boolean
}

interface State {
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  reset = () => this.setState({ error: null })

  render() {
    if (!this.state.error) return this.props.children

    if (this.props.fallback) return this.props.fallback

    const { error } = this.state
    const compact = this.props.compact

    if (compact) {
      return (
        <div className="flex items-center justify-center w-full h-full" style={{ color: colors.textCaption }}>
          <div className="text-center p-4">
            <div className="text-sm font-medium mb-1">渲染出错</div>
            <div className="text-xs opacity-60 max-w-[200px] truncate">{error.message}</div>
            <button
              onClick={this.reset}
              className="mt-2 text-xs px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              重试
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="flex items-center justify-center w-full h-full p-8">
        <div
          className="text-center p-6 rounded-xl max-w-md"
          style={{ background: colors.card, border: `1px solid ${colors.border}` }}
        >
          <div className="text-base font-semibold mb-2" style={{ color: colors.textPrimary }}>
            渲染出错
          </div>
          <div className="text-sm mb-4" style={{ color: colors.textSecondary }}>
            {error.message}
          </div>
          <button
            onClick={this.reset}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
          >
            重试
          </button>
        </div>
      </div>
    )
  }
}
