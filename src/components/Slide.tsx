import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { colors, motionConfig } from '../theme/swiss'

interface SlideProps {
  number: number
  children: ReactNode
}

const Slide = forwardRef<HTMLDivElement, SlideProps>(
  function Slide({ number, children }, ref) {
    return (
      <motion.div
        ref={ref}
        id={`slide-${number}`}
        className="w-[min(90vw,1600px)] aspect-video overflow-hidden relative rounded-xl px-20 py-16 flex flex-col justify-center"
        style={{ background: colors.slide, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
        {...motionConfig.slide}
      >
        {children}
      </motion.div>
    )
  },
)

export default Slide
