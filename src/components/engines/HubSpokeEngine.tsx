import { motion } from 'framer-motion'
import type { HubSpokeSlideData } from '../../data/types'
import { colors, motionConfig, generateGradientColors } from '../../theme/swiss'
import EngineTitle from './shared/EngineTitle'

const VB_W = 800
const VB_H = 480

function truncateLabel(text: string, maxChars: number): string {
  return text.length > maxChars ? text.slice(0, maxChars - 1) + '…' : text
}

export function HubSpokeDiagram({ center, spokes, variant, textColor, colorPalette }: { center: HubSpokeSlideData['center']; spokes: HubSpokeSlideData['spokes']; variant: HubSpokeSlideData['variant']; textColor?: string; colorPalette?: string }) {
  const palette = generateGradientColors(spokes.length, colorPalette)

  const cx = VB_W / 2
  const cy = VB_H / 2
  const orbitRx = 260
  const orbitRy = 185
  const centerR = 56
  const spokeR = 40

  const isSolar = variant === 'solar'
  const isPinwheel = variant === 'pinwheel'

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {variant === 'orbit' && (
        <ellipse cx={cx} cy={cy} rx={orbitRx} ry={orbitRy} fill="none" stroke={colors.border} strokeWidth="1.5" strokeDasharray="8 5" />
      )}

      {isSolar && (
        <>
          <circle cx={cx} cy={cy} r={centerR + 20} fill="none" stroke={colors.accentNeutral} strokeWidth="1.5" opacity={0.12} />
          <circle cx={cx} cy={cy} r={centerR + 36} fill="none" stroke={colors.accentNeutral} strokeWidth="1" opacity={0.06} />
        </>
      )}

      {spokes.map((spoke, i) => {
        const angle = (2 * Math.PI * i) / spokes.length - Math.PI / 2
        const sx = cx + orbitRx * Math.cos(angle)
        const sy = cy + orbitRy * Math.sin(angle)
        const color = palette[i]

        return (
          <g key={i}>
            {isSolar ? (
              <line x1={cx} y1={cy} x2={sx} y2={sy} stroke={color} strokeWidth="2.5" opacity={0.3} />
            ) : isPinwheel ? (
              <path
                d={`M${cx},${cy} Q${cx + (sx - cx) * 0.3 + 30},${cy + (sy - cy) * 0.3 - 30} ${sx},${sy}`}
                fill="none" stroke={color} strokeWidth="2.5" opacity={0.4}
              />
            ) : (
              <line x1={cx} y1={cy} x2={sx} y2={sy} stroke={colors.border} strokeWidth="1.5" />
            )}

            <circle cx={sx} cy={sy} r={spokeR} fill={color} opacity={0.88} />
            <text
              x={sx} y={spoke.description ? sy - 4 : sy + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="14" fontWeight="700" fill={textColor || 'white'}
            >
              {truncateLabel(spoke.label, 6)}
            </text>
            {spoke.description && (
              <text x={sx} y={sy + 14} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill={textColor || 'white'} opacity={0.8}>
                {spoke.description}
              </text>
            )}
          </g>
        )
      })}

      <circle cx={cx} cy={cy} r={centerR} fill={colors.accentNeutral} />
      <text
        x={cx} y={center.description ? cy - 7 : cy}
        textAnchor="middle" dominantBaseline="middle"
        fontSize="15" fontWeight="800" fill={textColor || 'white'}
      >
        {truncateLabel(center.label, 8)}
      </text>
      {center.description && (
        <text x={cx} y={cy + 13} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill={textColor || 'white'} opacity={0.8}>
          {center.description}
        </text>
      )}
    </svg>
  )
}

export default function HubSpokeEngine({ title, body, center, spokes, variant, titleSize, bodySize, titleColor, textColor, colorPalette }: HubSpokeSlideData) {
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
        <HubSpokeDiagram center={center} spokes={spokes} variant={variant} textColor={textColor} colorPalette={colorPalette} />
      </motion.div>
    </motion.div>
  )
}
