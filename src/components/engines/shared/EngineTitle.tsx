import { motion } from 'framer-motion'
import { colors, motionConfig } from '../../../theme/swiss'

interface EngineTitleProps {
  title: string
  body?: string
}

export default function EngineTitle({ title, body }: EngineTitleProps) {
  return (
    <div>
      <motion.h2
        variants={motionConfig.child}
        className="text-4xl font-bold"
        style={{ color: colors.textPrimary }}
      >
        {title}
      </motion.h2>
      {body && (
        <motion.p
          variants={motionConfig.child}
          className="text-lg mt-2"
          style={{ color: colors.textSecondary }}
        >
          {body}
        </motion.p>
      )}
    </div>
  )
}
