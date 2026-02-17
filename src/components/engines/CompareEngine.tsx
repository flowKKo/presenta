import { useId } from 'react'
import { motion } from 'framer-motion'
import type { CompareSlideData } from '../../data/types'
import { colors, motionConfig, generateGradientColors } from '../../theme/swiss'
import EngineTitle from './shared/EngineTitle'
import EditableText from '../editor/EditableText'

function VersusMode({ sides, textColor, colorPalette }: { sides: CompareSlideData['sides']; textColor?: string; colorPalette?: string }) {
  if (!sides || sides.length < 2) return null
  const palette = generateGradientColors(sides.length, colorPalette)
  const cols = Math.min(sides.length, 4)
  return (
    <div className="grid gap-6 flex-1 min-h-0" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {sides.map((side, si) => (
        <motion.div key={si} variants={motionConfig.child} className="rounded-xl p-6 flex flex-col" style={{ background: colors.card, borderTop: `4px solid ${palette[si]}` }}>
          <EditableText value={side.name} field={`sides.${si}.name`} as="div" className="text-xl font-bold mb-5" style={{ color: palette[si] }} />
          <div className="flex flex-col gap-4 flex-1">
            {side.items.map((item, ii) => (
              <div key={ii} className="flex justify-between items-center py-2" style={{ borderBottom: `1px solid ${colors.border}` }}>
                <EditableText value={item.label} field={`sides.${si}.items.${ii}.label`} as="span" className="text-base" style={{ color: textColor || colors.textSecondary }} />
                <EditableText value={item.value} field={`sides.${si}.items.${ii}.value`} as="span" className="text-base font-semibold" style={{ color: textColor || colors.textPrimary }} />
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function QuadrantMode({ quadrantItems, xAxis, yAxis, colorPalette }: Pick<CompareSlideData, 'quadrantItems' | 'xAxis' | 'yAxis'> & { colorPalette?: string }) {
  const uid = useId()
  if (!quadrantItems) return null
  const palette = generateGradientColors(quadrantItems.length, colorPalette)
  const pad = 60
  const w = 700
  const h = 400
  const vbW = w + pad * 2
  const vbH = h + pad * 2
  const cx = pad + w / 2
  const cy = pad + h / 2
  const axisColor = 'rgba(0,0,0,0.12)'

  // Derive quadrant labels from axis names (strip trailing arrows/symbols)
  const xName = xAxis?.replace(/[→↑↓←…]+$/g, '').trim() || ''
  const yName = yAxis?.replace(/[→↑↓←…]+$/g, '').trim() || ''
  const quadrantLabels = xName && yName ? [
    { x: pad + w * 0.75, y: pad + h * 0.15, text: `高${xName}·高${yName}` },       // top-right
    { x: pad + w * 0.25, y: pad + h * 0.15, text: `低${xName}·高${yName}` },       // top-left
    { x: pad + w * 0.25, y: pad + h * 0.9, text: `低${xName}·低${yName}` },        // bottom-left
    { x: pad + w * 0.75, y: pad + h * 0.9, text: `高${xName}·低${yName}` },        // bottom-right
  ] : []

  return (
    <motion.div variants={motionConfig.child} className="flex-1 min-h-0 w-full">
      <svg
        width="100%" height="100%"
        viewBox={`0 0 ${vbW} ${vbH}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="象限图"
      >
        <defs>
          <marker id={`${uid}-arr-r`} markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill={axisColor} />
          </marker>
          <marker id={`${uid}-arr-u`} markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill={axisColor} />
          </marker>
        </defs>

        {/* Quadrant background tints */}
        <rect x={cx} y={pad} width={w / 2} height={h / 2} fill={colors.accentPositive} opacity={0.05} rx={2} />
        <rect x={pad} y={pad} width={w / 2} height={h / 2} fill={colors.accentNeutral} opacity={0.04} rx={2} />
        <rect x={pad} y={cy} width={w / 2} height={h / 2} fill="rgba(0,0,0,0.02)" rx={2} />
        <rect x={cx} y={cy} width={w / 2} height={h / 2} fill={colors.accentNegative} opacity={0.04} rx={2} />

        {/* Quadrant labels */}
        {quadrantLabels.map((ql, i) => (
          <text key={i} x={ql.x} y={ql.y} textAnchor="middle" fontSize="11" fontWeight="500" fill={colors.textCaption} opacity={0.7}>
            {ql.text}
          </text>
        ))}

        {/* Axes — dashed with arrows */}
        <line x1={pad} y1={cy} x2={pad + w - 2} y2={cy} stroke={axisColor} strokeWidth="1" strokeDasharray="6 4" markerEnd={`url(#${uid}-arr-r)`} />
        <line x1={cx} y1={pad + h} x2={cx} y2={pad + 2} stroke={axisColor} strokeWidth="1" strokeDasharray="6 4" markerEnd={`url(#${uid}-arr-u)`} />

        {/* Axis labels — positioned at ends */}
        {xAxis && <text x={pad + w + 6} y={cy + 5} textAnchor="start" fontSize="13" fontWeight="600" fill={colors.textSecondary}>{xAxis}</text>}
        {yAxis && <text x={cx} y={pad - 10} textAnchor="middle" fontSize="13" fontWeight="600" fill={colors.textSecondary}>{yAxis}</text>}

        {/* Data points */}
        {quadrantItems.map((item, i) => {
          const px = pad + (item.x / 100) * w
          const py = pad + h - (item.y / 100) * h
          return (
            <g key={i}>
              <circle cx={px} cy={py} r={8} fill={palette[i]} opacity={0.15} />
              <circle cx={px} cy={py} r={5} fill={palette[i]} />
              <text x={px} y={py - 14} textAnchor="middle" fontSize="12" fontWeight="600" fill={colors.textPrimary} stroke={colors.slide} strokeWidth={3} paintOrder="stroke">{item.label}</text>
            </g>
          )
        })}
      </svg>
    </motion.div>
  )
}

function IcebergMode({ visible, hidden }: Pick<CompareSlideData, 'visible' | 'hidden'>) {
  const visibleCount = visible?.length ?? 0
  const hiddenCount = hidden?.length ?? 0
  // Hidden section (below water) should be proportionally larger to convey the iceberg metaphor
  const visibleFlex = Math.max(visibleCount, 1)
  const hiddenFlex = Math.max(hiddenCount, 2)

  return (
    <motion.div variants={motionConfig.child} className="flex flex-col flex-1 gap-0 overflow-hidden rounded-xl min-h-0">
      {/* above water */}
      <div className="p-6 flex flex-col gap-3 justify-center" style={{ background: `${colors.accentPositive}18`, flex: visibleFlex }}>
        <div className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: colors.accentPositive }}>显性因素</div>
        {visible?.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: colors.accentPositive }} />
            <EditableText value={item.label} field={`visible.${i}.label`} as="span" className="text-base font-medium" style={{ color: colors.textPrimary }} />
            {item.description && (
              <>
                <span className="text-sm" style={{ color: colors.textSecondary }}>&mdash;</span>
                <EditableText value={item.description} field={`visible.${i}.description`} as="span" className="text-sm" style={{ color: colors.textSecondary }} />
              </>
            )}
          </div>
        ))}
      </div>
      {/* waterline */}
      <div className="relative h-2" style={{ background: `linear-gradient(90deg, ${colors.accentNeutral}22, ${colors.accentNeutral}88, ${colors.accentNeutral}22)` }}>
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: `${colors.accentNeutral}66` }} />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: `${colors.accentNeutral}44` }} />
      </div>
      {/* below water */}
      <div className="p-6 flex flex-col gap-3 justify-center" style={{ background: `${colors.accentNeutral}12`, flex: hiddenFlex }}>
        <div className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: colors.accentNeutral }}>隐性因素</div>
        {hidden?.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: colors.accentNeutral }} />
            <EditableText value={item.label} field={`hidden.${i}.label`} as="span" className="text-base font-medium" style={{ color: colors.textPrimary }} />
            {item.description && (
              <>
                <span className="text-sm" style={{ color: colors.textSecondary }}>&mdash;</span>
                <EditableText value={item.description} field={`hidden.${i}.description`} as="span" className="text-sm" style={{ color: colors.textSecondary }} />
              </>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function CompareDiagram(props: Omit<CompareSlideData, 'type' | 'title' | 'body'> & { textColor?: string; colorPalette?: string }) {
  const { mode, textColor, colorPalette } = props
  return (
    <>
      {mode === 'versus' && <VersusMode sides={props.sides} textColor={textColor} colorPalette={colorPalette} />}
      {mode === 'quadrant' && <QuadrantMode quadrantItems={props.quadrantItems} xAxis={props.xAxis} yAxis={props.yAxis} colorPalette={colorPalette} />}
      {mode === 'iceberg' && <IcebergMode visible={props.visible} hidden={props.hidden} />}
    </>
  )
}

export default function CompareEngine(props: CompareSlideData) {
  const { title, body, mode, titleSize, bodySize, titleColor, textColor, colorPalette } = props

  return (
    <motion.div
      className="flex flex-col gap-6 h-full"
      variants={motionConfig.stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <EngineTitle title={title} body={body} titleSize={titleSize} bodySize={bodySize} titleColor={titleColor} textColor={textColor} />
      <CompareDiagram mode={mode} sides={props.sides} quadrantItems={props.quadrantItems} xAxis={props.xAxis} yAxis={props.yAxis} visible={props.visible} hidden={props.hidden} textColor={textColor} colorPalette={colorPalette} />
    </motion.div>
  )
}
