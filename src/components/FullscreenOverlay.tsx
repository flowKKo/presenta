import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { colors } from '../theme/swiss'
import type { SlideData } from '../data/types'
import SlideContent from './SlideContent'
import ContentBoxWrapper from './editor/ContentBoxWrapper'
import OverlayLayer from './editor/OverlayLayer'
import { SpotlightProvider } from '../hooks/useSpotlight'

interface FullscreenOverlayProps {
  slides: SlideData[]
  currentIndex: number
  onNext: () => void
  onPrev: () => void
  onExit: () => void
  spotlight: boolean
}

function getBlockCount(slide: SlideData): number {
  return slide.type === 'block-slide' ? slide.blocks.length : 0
}

export default function FullscreenOverlay({
  slides,
  currentIndex,
  onNext,
  onPrev,
  onExit,
  spotlight,
}: FullscreenOverlayProps) {
  const [direction, setDirection] = useState(0)
  const [revealedCount, setRevealedCount] = useState(0)
  // Track whether a slide just changed — suppress transition on initial render
  const slideJustChanged = useRef(true)
  const prevIndex = useRef(currentIndex)

  const currentSlide = slides[currentIndex]
  const blockCount = getBlockCount(currentSlide)

  // Track slide changes for direction animation
  if (currentIndex !== prevIndex.current) {
    setDirection(currentIndex > prevIndex.current ? 1 : -1)
    prevIndex.current = currentIndex
    slideJustChanged.current = true
  }

  // Reset revealed count when slide changes
  useEffect(() => {
    if (direction >= 0) {
      setRevealedCount(0)
    } else {
      setRevealedCount(getBlockCount(slides[currentIndex]))
    }
    // Clear the "just changed" flag after the first render frame
    const raf = requestAnimationFrame(() => {
      slideJustChanged.current = false
    })
    return () => cancelAnimationFrame(raf)
  }, [currentIndex, direction, slides])

  const handleNext = useCallback(() => {
    if (spotlight && blockCount > 0 && revealedCount < blockCount) {
      setRevealedCount((c) => c + 1)
    } else {
      onNext()
    }
  }, [spotlight, blockCount, revealedCount, onNext])

  const handlePrev = useCallback(() => {
    if (spotlight && revealedCount > 0) {
      setRevealedCount((c) => c - 1)
    } else {
      onPrev()
    }
  }, [spotlight, revealedCount, onPrev])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'Enter':
          e.preventDefault()
          handleNext()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          handlePrev()
          break
        case 'Escape':
          e.preventDefault()
          onExit()
          break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleNext, handlePrev, onExit])

  const isFirst = currentIndex === 0

  return (
    <div
      className="fixed inset-0 z-[9999]"
      style={{ background: colors.slide }}
    >
      {/* Left 20% — prev */}
      {!isFirst && (
        <div
          onClick={handlePrev}
          className="absolute left-0 top-0 bottom-0 w-[20%] z-10 cursor-pointer"
        />
      )}

      {/* Right 80% — next */}
      <div
        onClick={handleNext}
        className="absolute right-0 top-0 bottom-0 z-10 cursor-pointer"
        style={{ left: isFirst ? '0' : '20%' }}
      />

      {/* Full-bleed slide */}
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, x: direction * 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -300 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full px-20 py-16"
          style={{ background: colors.slide }}
        >
          <div className="relative w-full h-full">
            <SpotlightProvider value={{ active: spotlight, revealedCount }}>
              <ContentBoxWrapper slideIndex={currentIndex} slideData={slides[currentIndex]}>
                <SlideContent data={slides[currentIndex]} slideIndex={currentIndex} />
              </ContentBoxWrapper>
            </SpotlightProvider>
            <OverlayLayer slideIndex={currentIndex} readOnly />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
