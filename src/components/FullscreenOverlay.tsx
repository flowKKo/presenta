import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { colors } from '../theme/swiss'
import type { SlideData } from '../data/types'
import SlideContent from './SlideContent'

interface FullscreenOverlayProps {
  slides: SlideData[]
  currentIndex: number
  onNext: () => void
  onPrev: () => void
  onExit: () => void
}

export default function FullscreenOverlay({
  slides,
  currentIndex,
  onNext,
  onPrev,
  onExit,
}: FullscreenOverlayProps) {
  const [direction, setDirection] = useState(0)
  const prevIndex = useRef(currentIndex)

  if (currentIndex !== prevIndex.current) {
    setDirection(currentIndex > prevIndex.current ? 1 : -1)
    prevIndex.current = currentIndex
  }

  const isFirst = currentIndex === 0
  const isLast = currentIndex === slides.length - 1

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col" style={{ background: colors.page }}>
      {/* Close button */}
      <button
        onClick={onExit}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-colors hover:bg-black/10"
        style={{ color: colors.textSecondary }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 4l12 12M16 4L4 16" />
        </svg>
      </button>

      {/* Slide area */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Left click zone */}
        {!isFirst && (
          <button
            onClick={onPrev}
            className="absolute left-0 top-0 bottom-0 w-24 z-10 flex items-center justify-start pl-4 cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
            style={{ color: colors.textSecondary }}
          >
            <span className="text-4xl font-light select-none">&lsaquo;</span>
          </button>
        )}

        {/* Right click zone */}
        {!isLast && (
          <button
            onClick={onNext}
            className="absolute right-0 top-0 bottom-0 w-24 z-10 flex items-center justify-end pr-4 cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
            style={{ color: colors.textSecondary }}
          >
            <span className="text-4xl font-light select-none">&rsaquo;</span>
          </button>
        )}

        {/* Animated slide */}
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -300 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-[min(90vw,calc(100vh*16/9))] aspect-video overflow-hidden rounded-xl px-20 py-16 flex flex-col justify-center"
            style={{ background: colors.slide, boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}
          >
            <SlideContent data={slides[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Page indicator */}
      <div className="py-3 text-center text-sm" style={{ color: colors.textCaption }}>
        {currentIndex + 1} / {slides.length}
      </div>
    </div>
  )
}
