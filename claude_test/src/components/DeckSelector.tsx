import { motion } from 'framer-motion'
import { colors, cardStyle, motionConfig } from '../theme/swiss'
import type { DeckMeta } from '../data/types'

interface DeckSelectorProps {
  decks: DeckMeta[]
}

export default function DeckSelector({ decks }: DeckSelectorProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 py-20"
      style={{ background: colors.page }}
    >
      <motion.div
        className="w-full max-w-[1200px] flex flex-col gap-12"
        initial="hidden"
        animate="visible"
        variants={motionConfig.stagger}
      >
        <motion.div variants={motionConfig.child} className="flex flex-col gap-3">
          <h1
            className="text-5xl font-bold leading-tight"
            style={{ color: colors.textPrimary }}
          >
            Web PPT
          </h1>
          <p
            className="text-xl"
            style={{ color: colors.textSecondary }}
          >
            {decks.length} 个演示文稿
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={motionConfig.stagger}
        >
          {decks.map((deck) => (
            <motion.a
              key={deck.id}
              href={`#${deck.id}`}
              className="rounded-[14px] px-8 py-6 flex flex-col gap-4 no-underline transition-shadow hover:shadow-lg"
              style={cardStyle}
              variants={motionConfig.child}
            >
              <div className="flex flex-col gap-2">
                <h2
                  className="text-xl font-semibold leading-tight"
                  style={{ color: colors.textPrimary }}
                >
                  {deck.title}
                </h2>
                {deck.description && (
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: colors.textSecondary }}
                  >
                    {deck.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4 mt-auto pt-2">
                {deck.date && (
                  <span
                    className="text-base"
                    style={{ color: colors.textCaption }}
                  >
                    {deck.date}
                  </span>
                )}
                <span
                  className="text-base px-2 py-0.5 rounded"
                  style={{
                    color: colors.accentNeutral,
                    background: `rgba(84,110,122,0.08)`,
                  }}
                >
                  {deck.slides.length} slides
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
