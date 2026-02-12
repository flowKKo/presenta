import { motion } from 'framer-motion'
import type { ConcentricSlideData } from '../../data/types'
import { colors, motionConfig, generateGradientColors } from '../../theme/swiss'
import EngineTitle from './shared/EngineTitle'

// viewBox coordinate system — SVG itself fills container via width/height 100%
const VB_W = 800
const VB_H = 480

export default function ConcentricEngine({ title, body, rings, variant }: ConcentricSlideData) {
  const palette = generateGradientColors(rings.length)
  const count = rings.length

  const isDiamond = variant === 'diamond'
  const isTarget = variant === 'target'

  // Center the shapes in the left portion, leave right for labels
  const cx = VB_W * 0.4
  const cy = VB_H / 2
  const maxR = Math.min(cx - 40, cy - 30)  // ~280
  const minR = maxR * 0.22

  // Label column starts to the right of outermost ring
  const labelX = cx + maxR + 30

  return (
    <motion.div
      className="flex flex-col gap-4 h-full"
      variants={motionConfig.stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <EngineTitle title={title} body={body} />
      <motion.div variants={motionConfig.child} className="flex-1 min-h-0 w-full">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Render from outermost to innermost */}
          {rings.map((_, i) => {
            const ringIndex = count - 1 - i
            const ring = rings[ringIndex]
            const t = count === 1 ? 1 : ringIndex / (count - 1)
            const r = minR + (maxR - minR) * t
            const color = palette[ringIndex]
            const opacity = isTarget
              ? 0.15 + t * 0.55
              : 0.12

            if (isDiamond) {
              const half = r
              return (
                <g key={ringIndex}>
                  <polygon
                    points={`${cx},${cy - half} ${cx + half},${cy} ${cx},${cy + half} ${cx - half},${cy}`}
                    fill={color}
                    fillOpacity={opacity}
                    stroke={color}
                    strokeWidth="2.5"
                  />
                </g>
              )
            }

            return (
              <g key={ringIndex}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={color}
                  fillOpacity={opacity}
                  stroke={color}
                  strokeWidth="2.5"
                />
              </g>
            )
          })}

          {/* Labels on the right */}
          {rings.map((ring, i) => {
            const t = count === 1 ? 1 : i / (count - 1)
            const r = minR + (maxR - minR) * t
            const color = palette[i]
            // Evenly space labels vertically, aligned to their ring
            const labelY = cy - maxR + 24 + i * ((maxR * 2 - 24) / Math.max(count - 1, 1))

            return (
              <g key={`label-${i}`}>
                {/* Connector line from ring edge to label */}
                <line
                  x1={cx + r}
                  y1={cy - r * 0.15 + i * (r * 0.08)}
                  x2={labelX - 8}
                  y2={labelY - 2}
                  stroke={color}
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  opacity={0.4}
                />
                <circle cx={labelX - 8} cy={labelY - 2} r={3} fill={color} opacity={0.6} />
                <text
                  x={labelX}
                  y={ring.description ? labelY - 6 : labelY}
                  fontSize="16"
                  fontWeight="700"
                  fill={colors.textPrimary}
                >
                  {ring.label}
                </text>
                {ring.description && (
                  <text
                    x={labelX}
                    y={labelY + 14}
                    fontSize="13"
                    fill={colors.textSecondary}
                  >
                    {ring.description}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </motion.div>
    </motion.div>
  )
}
