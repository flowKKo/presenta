import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { colors, motionConfig } from '../theme/swiss'

interface SlideProps {
  number: number
  children: ReactNode
  onExpand?: () => void
}

const Slide = forwardRef<HTMLDivElement, SlideProps>(
  function Slide({ number, children, onExpand }, ref) {
    return (
      <motion.div
        ref={ref}
        id={`slide-${number}`}
        className="w-[min(90vw,1600px)] aspect-video overflow-hidden relative rounded-xl px-20 py-16 flex flex-col justify-center group"
        style={{ background: colors.slide, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
        {...motionConfig.slide}
      >
        {children}

        {/* Expand button — hover to show */}
        {onExpand && (
          <button
            onClick={onExpand}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: 'rgba(0,0,0,0.06)',
              color: colors.textSecondary,
            }}
            title="全屏预览"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" />
            </svg>
          </button>
        )}
      </motion.div>
    )
  },
)

export default Slide
