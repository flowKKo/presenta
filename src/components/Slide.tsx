import { forwardRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { colors, motionConfig } from '../theme/swiss'
import type { SlideData } from '../data/types'
import ContentBoxWrapper from './editor/ContentBoxWrapper'
import OverlayLayer from './editor/OverlayLayer'
import { useEditor } from './editor/EditorProvider'

interface SlideProps {
  number: number
  slideIndex: number
  slideData: SlideData
  children: ReactNode
}

const Slide = forwardRef<HTMLDivElement, SlideProps>(
  function Slide({ number, slideIndex, slideData, children }, ref) {
    const { editMode, setSelection } = useEditor()

    // Click on the slide padding area (outside content box / overlay layer) → deselect
    const handlePaddingClick = useCallback((e: React.MouseEvent) => {
      if (!editMode) return
      if (e.target === e.currentTarget) setSelection(null)
    }, [editMode, setSelection])

    return (
      <motion.div
        ref={ref}
        id={`slide-${number}`}
        className="w-[min(90vw,1600px)] aspect-video overflow-hidden relative rounded-xl"
        style={{ background: colors.slide, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
        {...motionConfig.slide}
      >
        {/* Inner area with padding — serves as coordinate system origin */}
        <div className="absolute inset-0 px-20 py-16" onClick={handlePaddingClick}>
          <div className="relative w-full h-full">
            {/* Content box wrapper */}
            <ContentBoxWrapper slideIndex={slideIndex} slideData={slideData}>
              {children}
            </ContentBoxWrapper>

            {/* Overlay layer */}
            <OverlayLayer slideIndex={slideIndex} />
          </div>
        </div>
      </motion.div>
    )
  },
)

export default Slide
