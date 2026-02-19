import { motion } from 'framer-motion'
import type { SwotSlideData, SwotItem } from '../../data/types'
import { colors, motionConfig, generateGradientColors } from '../../theme/swiss'
import EngineTitle from './shared/EngineTitle'
import EditableText from '../editor/EditableText'

const QUADRANT_META = [
  { key: 'strengths', label: '优势 (S)', icon: '↑' },
  { key: 'weaknesses', label: '劣势 (W)', icon: '↓' },
  { key: 'opportunities', label: '机会 (O)', icon: '★' },
  { key: 'threats', label: '威胁 (T)', icon: '⚠' },
] as const

export function SwotDiagram({ strengths, weaknesses, opportunities, threats, textColor, colorPalette }: {
  strengths: SwotItem[]; weaknesses: SwotItem[]; opportunities: SwotItem[]; threats: SwotItem[]
  textColor?: string; colorPalette?: string
}) {
  const palette = generateGradientColors(4, colorPalette)
  const quadrants = [strengths ?? [], weaknesses ?? [], opportunities ?? [], threats ?? []]

  return (
    <div className="grid grid-cols-2 gap-3 h-full p-2">
      {QUADRANT_META.map((meta, qi) => (
        <div
          key={meta.key}
          className="rounded-xl p-5 flex flex-col overflow-hidden"
          style={{ background: `${palette[qi]}10`, border: `2px solid ${palette[qi]}30` }}
        >
          <div className="flex items-center gap-2 mb-4 shrink-0">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: palette[qi] }}>
              {meta.icon}
            </span>
            <span className="text-base font-bold" style={{ color: textColor || colors.textPrimary }}>
              {meta.label}
            </span>
          </div>
          <div className="flex flex-col gap-2.5 overflow-y-auto flex-1">
            {quadrants[qi].map((item, ii) => {
              const fieldPrefix = `${meta.key}.${ii}`
              return (
                <div key={ii} className="flex items-start gap-2.5">
                  {/* Dot aligned with the center of the first line of text (text-sm = 14px, lh ~20px → center ~10px, dot 8px → mt-[6px]) */}
                  <span className="w-2 h-2 rounded-full mt-[6px] shrink-0" style={{ backgroundColor: palette[qi] }} />
                  <div className="flex-1 min-w-0">
                    <EditableText value={item.label} field={`${fieldPrefix}.label`} as="div" className="text-sm font-medium" style={{ color: textColor || colors.textPrimary }} />
                    {item.description && (
                      <EditableText value={item.description} field={`${fieldPrefix}.description`} as="div" className="text-xs mt-0.5" style={{ color: colors.textCaption }} />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SwotEngine({ title, body, strengths, weaknesses, opportunities, threats, titleSize, bodySize, titleColor, textColor, colorPalette }: SwotSlideData) {
  return (
    <motion.div
      className="flex flex-col gap-4 h-full"
      variants={motionConfig.stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <EngineTitle title={title} body={body} titleSize={titleSize} bodySize={bodySize} titleColor={titleColor} textColor={textColor} />
      <motion.div variants={motionConfig.child} className="flex-1 min-h-0 w-full">
        <SwotDiagram strengths={strengths} weaknesses={weaknesses} opportunities={opportunities} threats={threats} textColor={textColor} colorPalette={colorPalette} />
      </motion.div>
    </motion.div>
  )
}
