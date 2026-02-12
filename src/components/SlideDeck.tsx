import type { ReactNode } from 'react'
import { colors } from '../theme/swiss'

interface SlideDeckProps {
  children: ReactNode
  onBack?: () => void
}

export default function SlideDeck({ children, onBack }: SlideDeckProps) {
  return (
    <div
      className="flex flex-col items-center gap-10 py-10 min-h-screen relative"
      style={{ background: colors.page }}
    >
      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-5 left-5 z-50 px-4 py-2 rounded-lg text-base font-medium cursor-pointer transition-colors"
          style={{
            color: colors.textSecondary,
            background: colors.card,
            border: `1px solid ${colors.border}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          ← 返回
        </button>
      )}
      {children}
    </div>
  )
}
