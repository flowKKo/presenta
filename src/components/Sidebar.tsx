import { useEffect, useRef } from 'react'
import { MotionConfig } from 'framer-motion'
import { colors } from '../theme/swiss'
import type { SlideData } from '../data/types'
import SlideContent from './SlideContent'

interface SidebarProps {
  slides: SlideData[]
  activeIndex: number
  onClickSlide: (index: number) => void
}

const THUMB_W = 192 // thumbnail container width in px
const SLIDE_W = 960  // render width for slide content

export default function Sidebar({ slides, activeIndex, onClickSlide }: SidebarProps) {
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])
  const scale = THUMB_W / SLIDE_W

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    const el = thumbRefs.current[activeIndex]
    if (el) {
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [activeIndex])

  return (
    <div
      className="fixed left-0 top-0 h-screen w-56 z-40 hidden xl:flex flex-col border-r overflow-y-auto"
      style={{ background: colors.card, borderColor: colors.border }}
    >
      <div className="flex flex-col gap-3 p-4">
        {slides.map((slide, i) => {
          const isActive = i === activeIndex
          return (
            <button
              key={i}
              ref={(el) => { thumbRefs.current[i] = el }}
              onClick={() => onClickSlide(i)}
              className="w-full text-left cursor-pointer group"
            >
              {/* Slide number */}
              <div
                className="text-xs mb-1 font-medium"
                style={{ color: isActive ? colors.accentNeutral : colors.textCaption }}
              >
                {i + 1}
              </div>

              {/* Thumbnail */}
              <div
                className="w-full aspect-video overflow-hidden rounded-md transition-all"
                style={{
                  border: isActive
                    ? `2px solid ${colors.accentNeutral}`
                    : `1px solid ${colors.border}`,
                  boxShadow: isActive ? `0 0 0 2px ${colors.accentNeutral}33` : 'none',
                }}
              >
                <MotionConfig reducedMotion="always">
                  <div
                    className="pointer-events-none origin-top-left"
                    style={{
                      width: SLIDE_W,
                      height: SLIDE_W * 9 / 16,
                      transform: `scale(${scale})`,
                      background: colors.slide,
                    }}
                  >
                    <div className="w-full h-full px-20 py-16 flex flex-col justify-center">
                      <SlideContent data={slide} />
                    </div>
                  </div>
                </MotionConfig>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
