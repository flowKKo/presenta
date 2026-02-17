import { useId } from 'react'
import { motion } from 'framer-motion'
import type { CycleSlideData } from '../../data/types'
import { colors, motionConfig, generateGradientColors } from '../../theme/swiss'
import EngineTitle from './shared/EngineTitle'

const VB_W = 800
const VB_H = 480

function truncateLabel(text: string, maxChars: number): string {
  return text.length > maxChars ? text.slice(0, maxChars - 1) + '…' : text
}

/**
 * Compute arc arrows that follow a circular/elliptical path between nodes.
 * Arrows depart tangentially from each node and curve along the orbit toward the next.
 */
function computeArcArrow(
  i: number, n: number,
  positions: { x: number; y: number }[],
  cx: number, cy: number,
  orbitRx: number, orbitRy: number,
  nodeR: number,
) {
  const j = (i + 1) % n
  const θi = -Math.PI / 2 + (2 * Math.PI * i) / n
  const θj = -Math.PI / 2 + (2 * Math.PI * j) / n

  // Tangent directions on the ellipse (forward = increasing angle = clockwise in SVG)
  // Derivative of (cx + rx*cos(t), cy + ry*sin(t)) is (-rx*sin(t), ry*cos(t))
  const tanILen = Math.sqrt((orbitRx * Math.sin(θi)) ** 2 + (orbitRy * Math.cos(θi)) ** 2)
  const tanIx = -orbitRx * Math.sin(θi) / tanILen
  const tanIy = orbitRy * Math.cos(θi) / tanILen

  const tanJLen = Math.sqrt((orbitRx * Math.sin(θj)) ** 2 + (orbitRy * Math.cos(θj)) ** 2)
  const tanJx = orbitRx * Math.sin(θj) / tanJLen
  const tanJy = -orbitRy * Math.cos(θj) / tanJLen

  // Start: depart node i in forward tangent direction
  const gap = nodeR + 5
  const sx = positions[i].x + gap * tanIx
  const sy = positions[i].y + gap * tanIy

  // End: arrive at node j from backward tangent direction
  const ex = positions[j].x + gap * tanJx
  const ey = positions[j].y + gap * tanJy

  // Control point: on the orbit at the midpoint angle
  // Placed ON the orbit for a curve that follows the track closely
  const midAngle = θi + Math.PI / n
  const cpX = cx + orbitRx * Math.cos(midAngle)
  const cpY = cy + orbitRy * Math.sin(midAngle)

  return { sx, sy, ex, ey, cpX, cpY }
}

function CircularCycle({ steps, palette, textColor, uid }: { steps: CycleSlideData['steps']; palette: string[]; textColor?: string; uid: string }) {
  const n = steps.length
  const cx = VB_W / 2
  const cy = VB_H / 2
  const R = Math.min(cx - 110, cy - 70)
  const nodeR = Math.max(26, 46 - n * 3)

  const positions = steps.map((_, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n
    return { x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) }
  })

  return (
    <>
      <defs>
        <marker id={`${uid}-cyc`} markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
          <polygon points="0,0 10,4 0,8" fill={colors.textCaption} opacity={0.6} />
        </marker>
      </defs>
      {/* Arc arrows following the circular orbit */}
      {positions.map((_, i) => {
        const { sx, sy, ex, ey, cpX, cpY } = computeArcArrow(i, n, positions, cx, cy, R, R, nodeR)
        return (
          <path
            key={`a-${i}`}
            d={`M ${sx} ${sy} Q ${cpX} ${cpY} ${ex} ${ey}`}
            fill="none" stroke={colors.textCaption} strokeWidth="2"
            markerEnd={`url(#${uid}-cyc)`} opacity={0.5}
          />
        )
      })}
      {/* Nodes */}
      {positions.map((pos, i) => (
        <g key={i}>
          <circle cx={pos.x} cy={pos.y} r={nodeR} fill={palette[i]} fillOpacity={0.14} stroke={palette[i]} strokeWidth="2.5" />
          <text x={pos.x} y={steps[i].description ? pos.y - 5 : pos.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize={n > 6 ? 11 : 13} fontWeight="700" fill={textColor || colors.textPrimary}>
            {truncateLabel(steps[i].label, Math.floor(nodeR / 5))}
          </text>
          {steps[i].description && (
            <text x={pos.x} y={pos.y + 11} textAnchor="middle" dominantBaseline="middle" fontSize={10} fill={colors.textSecondary}>
              {truncateLabel(steps[i].description!, Math.floor(nodeR / 4))}
            </text>
          )}
        </g>
      ))}
    </>
  )
}

function GearCycle({ steps, palette, textColor, uid }: { steps: CycleSlideData['steps']; palette: string[]; textColor?: string; uid: string }) {
  const n = steps.length
  const cx = VB_W / 2
  const cy = VB_H / 2
  const R = Math.min(cx - 110, cy - 70)
  const nodeR = Math.max(28, 48 - n * 3)

  const positions = steps.map((_, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n
    return { x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) }
  })

  // Gear tooth path around a circle
  const gearPath = (gx: number, gy: number, r: number, teeth: number) => {
    const inner = r - 3
    const outer = r + 5
    const pts: string[] = []
    for (let t = 0; t < teeth; t++) {
      const a0 = (2 * Math.PI * t) / teeth
      const a1 = a0 + Math.PI / teeth * 0.4
      const a2 = a0 + Math.PI / teeth * 0.6
      const a3 = a0 + Math.PI / teeth
      pts.push(`${gx + inner * Math.cos(a0)},${gy + inner * Math.sin(a0)}`)
      pts.push(`${gx + outer * Math.cos(a1)},${gy + outer * Math.sin(a1)}`)
      pts.push(`${gx + outer * Math.cos(a2)},${gy + outer * Math.sin(a2)}`)
      pts.push(`${gx + inner * Math.cos(a3)},${gy + inner * Math.sin(a3)}`)
    }
    return pts.join(' ')
  }

  return (
    <>
      <defs>
        <marker id={`${uid}-gear`} markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
          <polygon points="0,0 10,4 0,8" fill={colors.textCaption} opacity={0.6} />
        </marker>
      </defs>
      {/* Arc arrows following the circular orbit */}
      {positions.map((_, i) => {
        const { sx, sy, ex, ey, cpX, cpY } = computeArcArrow(i, n, positions, cx, cy, R, R, nodeR + 5)
        return (
          <path
            key={`a-${i}`}
            d={`M ${sx} ${sy} Q ${cpX} ${cpY} ${ex} ${ey}`}
            fill="none" stroke={colors.textCaption} strokeWidth="2"
            markerEnd={`url(#${uid}-gear)`} opacity={0.5}
          />
        )
      })}
      {/* Gear nodes */}
      {positions.map((pos, i) => (
        <g key={i}>
          <polygon points={gearPath(pos.x, pos.y, nodeR, 8)} fill={palette[i]} fillOpacity={0.12} stroke={palette[i]} strokeWidth="2" />
          <circle cx={pos.x} cy={pos.y} r={nodeR - 6} fill={palette[i]} fillOpacity={0.06} />
          <text x={pos.x} y={steps[i].description ? pos.y - 5 : pos.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize={n > 6 ? 11 : 13} fontWeight="700" fill={textColor || colors.textPrimary}>
            {truncateLabel(steps[i].label, Math.floor(nodeR / 5))}
          </text>
          {steps[i].description && (
            <text x={pos.x} y={pos.y + 11} textAnchor="middle" dominantBaseline="middle" fontSize={10} fill={colors.textSecondary}>
              {truncateLabel(steps[i].description!, Math.floor(nodeR / 4))}
            </text>
          )}
        </g>
      ))}
    </>
  )
}

function LoopCycle({ steps, palette, textColor, uid }: { steps: CycleSlideData['steps']; palette: string[]; textColor?: string; uid: string }) {
  const n = steps.length
  const cx = VB_W / 2
  const cy = VB_H / 2
  // Elliptical orbit (racetrack shape)
  const rx = Math.min(cx - 80, 280)
  const ry = Math.min(cy - 60, 150)
  const nodeR = Math.max(22, 38 - n * 2)

  // Distribute steps evenly along the elliptical perimeter
  const positions = steps.map((_, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n
    return { x: cx + rx * Math.cos(angle), y: cy + ry * Math.sin(angle) }
  })

  return (
    <>
      <defs>
        <marker id={`${uid}-loop`} markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
          <polygon points="0,0 10,4 0,8" fill={colors.textCaption} opacity={0.6} />
        </marker>
      </defs>
      {/* Elliptical arc arrows — single unified track, no separate ellipse */}
      {positions.map((_, i) => {
        const { sx, sy, ex, ey, cpX, cpY } = computeArcArrow(i, n, positions, cx, cy, rx, ry, nodeR)
        return (
          <path
            key={`a-${i}`}
            d={`M ${sx} ${sy} Q ${cpX} ${cpY} ${ex} ${ey}`}
            fill="none" stroke={colors.textCaption} strokeWidth="2"
            markerEnd={`url(#${uid}-loop)`} opacity={0.5}
          />
        )
      })}
      {/* Circular nodes on elliptical path */}
      {positions.map((pos, i) => (
        <g key={i}>
          <circle cx={pos.x} cy={pos.y} r={nodeR} fill={palette[i]} fillOpacity={0.14} stroke={palette[i]} strokeWidth="2.5" />
          <text x={pos.x} y={steps[i].description ? pos.y - 4 : pos.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize={n > 6 ? 11 : 12} fontWeight="700" fill={textColor || colors.textPrimary}>
            {truncateLabel(steps[i].label, Math.floor(nodeR / 4))}
          </text>
          {steps[i].description && (
            <text x={pos.x} y={pos.y + 12} textAnchor="middle" dominantBaseline="middle" fontSize={10} fill={colors.textSecondary}>
              {truncateLabel(steps[i].description!, Math.floor(nodeR / 3.5))}
            </text>
          )}
        </g>
      ))}
    </>
  )
}

export function CycleDiagram({ steps, variant, textColor, colorPalette }: { steps: CycleSlideData['steps']; variant: CycleSlideData['variant']; textColor?: string; colorPalette?: string }) {
  const uid = useId()
  const palette = generateGradientColors(steps.length, colorPalette)
  if (steps.length === 0) return null

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label="循环图">
      {variant === 'gear' ? (
        <GearCycle steps={steps} palette={palette} textColor={textColor} uid={uid} />
      ) : variant === 'loop' ? (
        <LoopCycle steps={steps} palette={palette} textColor={textColor} uid={uid} />
      ) : (
        <CircularCycle steps={steps} palette={palette} textColor={textColor} uid={uid} />
      )}
    </svg>
  )
}

export default function CycleEngine({ title, body, steps, variant, titleSize, bodySize, titleColor, textColor, colorPalette }: CycleSlideData) {
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
        <CycleDiagram steps={steps} variant={variant} textColor={textColor} colorPalette={colorPalette} />
      </motion.div>
    </motion.div>
  )
}
