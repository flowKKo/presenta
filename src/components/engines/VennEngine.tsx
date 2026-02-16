import { motion } from 'framer-motion'
import type { VennSlideData } from '../../data/types'
import { colors, motionConfig, generateGradientColors } from '../../theme/swiss'
import EngineTitle from './shared/EngineTitle'

const VB_W = 800
const VB_H = 480

export function VennDiagram({ sets, intersectionLabel, variant, textColor, colorPalette }: { sets: VennSlideData['sets']; variant: VennSlideData['variant']; intersectionLabel?: string; textColor?: string; colorPalette?: string }) {
  const palette = generateGradientColors(sets.length, colorPalette)
  const count = sets.length
  if (count === 0) return null

  const centerX = VB_W / 2
  const centerY = VB_H / 2
  const r = 155

  const isLinear = variant === 'linear' || variant === 'linear-filled'
  const isFilled = variant === 'linear-filled'

  const positions = (() => {
    if (isLinear) {
      const spacing = r * 1.35
      const totalW = (count - 1) * spacing
      return sets.map((_, i) => ({
        cx: centerX - totalW / 2 + i * spacing,
        cy: centerY,
      }))
    }
    if (count === 2) {
      return [
        { cx: centerX - r * 0.48, cy: centerY },
        { cx: centerX + r * 0.48, cy: centerY },
      ]
    }
    const offset = r * 0.52
    return sets.map((_, i) => {
      const angle = (2 * Math.PI * i) / count - Math.PI / 2
      return {
        cx: centerX + offset * Math.cos(angle),
        cy: centerY + offset * Math.sin(angle),
      }
    })
  })()

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="韦恩图"
    >
      <defs>
        <style>{`.venn-circle { mix-blend-mode: multiply; }`}</style>
      </defs>

      {positions.map((pos, i) => (
        <circle
          key={i}
          className="venn-circle"
          cx={pos.cx} cy={pos.cy} r={r}
          fill={palette[i]} fillOpacity={isFilled ? 0.32 : 0.18}
          stroke={palette[i]} strokeWidth="3"
        />
      ))}

      {positions.map((pos, i) => {
        const dx = pos.cx - centerX
        const dy = pos.cy - centerY
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const labelPush = isLinear ? 0 : 45
        const lx = pos.cx + (dx / dist) * labelPush
        const ly = pos.cy + (dy / dist) * labelPush

        return (
          <g key={`l-${i}`}>
            <text x={lx} y={sets[i].description ? ly - 8 : ly} textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="700" fill={textColor || colors.textPrimary}>
              {sets[i].label}
            </text>
            {sets[i].description && (
              <text x={lx} y={ly + 14} textAnchor="middle" dominantBaseline="middle" fontSize="13" fill={colors.textSecondary}>
                {sets[i].description}
              </text>
            )}
          </g>
        )
      })}

      {intersectionLabel && (
        <text x={centerX} y={centerY} textAnchor="middle" dominantBaseline="middle" fontSize="16" fontWeight="800" fill={colors.accentNeutral}>
          {intersectionLabel}
        </text>
      )}
    </svg>
  )
}

export default function VennEngine({ title, body, sets, intersectionLabel, variant, titleSize, bodySize, titleColor, textColor, colorPalette }: VennSlideData) {
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
        <VennDiagram sets={sets} variant={variant} intersectionLabel={intersectionLabel} textColor={textColor} colorPalette={colorPalette} />
      </motion.div>
    </motion.div>
  )
}
