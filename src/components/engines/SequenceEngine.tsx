import { motion } from 'framer-motion'
import type { SequenceSlideData } from '../../data/types'
import { colors, motionConfig, generateGradientColors } from '../../theme/swiss'
import EngineTitle from './shared/EngineTitle'
import ConnectorArrow from './shared/ConnectorArrow'
import EditableText from '../editor/EditableText'

function TimelineStep({ label, description, index, color }: { label: string; description?: string; index: number; color: string }) {
  return (
    <motion.div variants={motionConfig.child} className="flex flex-col items-center text-center flex-1 min-w-0">
      <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold mb-3" style={{ backgroundColor: color }}>
        {index + 1}
      </div>
      <EditableText value={label} field={`steps.${index}.label`} as="div" className="text-lg font-semibold" style={{ color: colors.textPrimary }} />
      {description && <EditableText value={description} field={`steps.${index}.description`} as="div" className="text-sm mt-1" style={{ color: colors.textSecondary }} />}
    </motion.div>
  )
}

function ChainStep({ label, description, index, color }: { label: string; description?: string; index: number; color: string }) {
  return (
    <motion.div variants={motionConfig.child} className="flex-1 min-w-0 rounded-lg p-5" style={{ borderLeft: `4px solid ${color}`, background: colors.card }}>
      <EditableText value={label} field={`steps.${index}.label`} as="div" className="text-base font-semibold" style={{ color: colors.textPrimary }} />
      {description && <EditableText value={description} field={`steps.${index}.description`} as="div" className="text-sm mt-1" style={{ color: colors.textSecondary }} />}
    </motion.div>
  )
}

function ArrowStep({ label, description, index, color, textColor }: { label: string; description?: string; index: number; color: string; textColor?: string }) {
  return (
    <motion.div variants={motionConfig.child} className="flex-1 min-w-0 rounded-lg p-5 text-center" style={{ background: color }}>
      <EditableText value={label} field={`steps.${index}.label`} as="div" className="text-base font-bold" style={{ color: textColor || 'white' }} />
      {description && <EditableText value={description} field={`steps.${index}.description`} as="div" className="text-sm mt-1" style={{ color: textColor || 'white', opacity: 0.8 }} />}
    </motion.div>
  )
}

function PillStep({ label, description, index, color }: { label: string; description?: string; index: number; color: string }) {
  return (
    <motion.div variants={motionConfig.child} className="flex-1 min-w-0 flex flex-col items-center text-center">
      <EditableText value={label} field={`steps.${index}.label`} as="div" className="rounded-full px-6 py-3 text-base font-semibold" style={{ backgroundColor: `${color}18`, color }} />
      {description && <EditableText value={description} field={`steps.${index}.description`} as="div" className="text-sm mt-2" style={{ color: colors.textSecondary }} />}
    </motion.div>
  )
}

function RibbonStep({ label, description, index, color, isFirst, isLast, textColor, direction = 'horizontal' }: { label: string; description?: string; index: number; color: string; isFirst: boolean; isLast: boolean; textColor?: string; direction?: 'horizontal' | 'vertical' }) {
  const isH = direction === 'horizontal'
  // Chevron clip-path: first item has flat left, last has flat right, middle items have both notch and point
  const arrowDepth = 20 // px depth of the chevron point
  const clipFirst = isH
    ? `polygon(0 0, calc(100% - ${arrowDepth}px) 0, 100% 50%, calc(100% - ${arrowDepth}px) 100%, 0 100%)`
    : `polygon(0 0, 100% 0, 100% calc(100% - ${arrowDepth}px), 50% 100%, 0 calc(100% - ${arrowDepth}px))`
  const clipMiddle = isH
    ? `polygon(0 0, calc(100% - ${arrowDepth}px) 0, 100% 50%, calc(100% - ${arrowDepth}px) 100%, 0 100%, ${arrowDepth}px 50%)`
    : `polygon(0 0, 100% 0, 100% calc(100% - ${arrowDepth}px), 50% 100%, 0 calc(100% - ${arrowDepth}px), 0 0)`
  const clipLast = isH
    ? `polygon(0 0, 100% 0, 100% 100%, 0 100%, ${arrowDepth}px 50%)`
    : `polygon(0 0, 100% 0, 100% 100%, 50% 100%, 0 100%)`

  const clip = isFirst ? clipFirst : isLast ? clipLast : clipMiddle
  // Overlap ribbons so chevron points nest into the next ribbon's notch
  const margin = !isLast ? (isH ? { marginRight: `-${arrowDepth / 2}px` } : { marginBottom: `-${arrowDepth / 2}px` }) : undefined
  const padding = isH
    ? { paddingLeft: isFirst ? 20 : 20 + arrowDepth / 2, paddingRight: isLast ? 20 : 20 + arrowDepth / 2 }
    : { paddingTop: isFirst ? 16 : 16 + arrowDepth / 2, paddingBottom: isLast ? 16 : 16 + arrowDepth / 2 }

  return (
    <motion.div variants={motionConfig.child} className="flex-1 min-w-0 relative" style={margin}>
      <div
        className="py-5 text-center flex flex-col justify-center h-full"
        style={{ backgroundColor: color, clipPath: clip, ...padding }}
      >
        <EditableText value={label} field={`steps.${index}.label`} as="div" className="text-base font-bold" style={{ color: textColor || 'white' }} />
        {description && <EditableText value={description} field={`steps.${index}.description`} as="div" className="text-sm mt-1" style={{ color: textColor || 'white', opacity: 0.85 }} />}
      </div>
    </motion.div>
  )
}

function NumberedStep({ label, description, index, color }: { label: string; description?: string; index: number; color: string }) {
  return (
    <motion.div variants={motionConfig.child} className="flex-1 min-w-0 flex items-start gap-3">
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-extrabold shrink-0"
        style={{ backgroundColor: `${color}18`, color }}
      >
        {index + 1}
      </div>
      <div className="flex flex-col pt-1">
        <EditableText value={label} field={`steps.${index}.label`} as="div" className="text-base font-semibold" style={{ color: colors.textPrimary }} />
        {description && <EditableText value={description} field={`steps.${index}.description`} as="div" className="text-sm mt-1" style={{ color: colors.textSecondary }} />}
      </div>
    </motion.div>
  )
}

function ZigzagStep({ label, description, index, color, direction = 'horizontal' }: { label: string; description?: string; index: number; color: string; direction?: 'horizontal' | 'vertical' }) {
  const isEven = index % 2 === 0
  const isH = direction === 'horizontal'
  // Horizontal: vertical offset (h-6 spacers). Vertical: horizontal offset via padding
  return (
    <motion.div
      variants={motionConfig.child}
      className="flex-1 min-w-0 flex flex-col items-center text-center"
      style={!isH ? { paddingLeft: isEven ? 0 : 24, paddingRight: isEven ? 24 : 0 } : undefined}
    >
      {isH && !isEven && <div className="h-6" />}
      <div className="rounded-xl p-5 w-full" style={{ background: `${color}14`, borderTop: isH ? `3px solid ${color}` : undefined, borderLeft: !isH ? `3px solid ${color}` : undefined }}>
        <EditableText value={label} field={`steps.${index}.label`} as="div" className="text-base font-semibold" style={{ color: colors.textPrimary }} />
        {description && <EditableText value={description} field={`steps.${index}.description`} as="div" className="text-sm mt-1" style={{ color: colors.textSecondary }} />}
      </div>
      {isH && isEven && <div className="h-6" />}
    </motion.div>
  )
}

export function SequenceDiagram({ steps, variant, direction = 'horizontal', gap = 8, textColor, colorPalette }: { steps: SequenceSlideData['steps']; variant: SequenceSlideData['variant']; direction?: 'horizontal' | 'vertical'; gap?: number; textColor?: string; colorPalette?: string }) {
  const isH = direction === 'horizontal'
  const palette = generateGradientColors(steps.length, colorPalette)
  if (steps.length === 0) return null

  const renderSteps = () => {
    switch (variant) {
      case 'chain':
        return steps.map((s, i) => (
          <ChainStep key={i} label={s.label} description={s.description} index={i} color={palette[i]} />
        ))
      case 'arrows':
        return steps.map((s, i) => (
          <ArrowStep key={i} label={s.label} description={s.description} index={i} color={palette[i]} textColor={textColor} />
        ))
      case 'pills':
        return steps.map((s, i) => (
          <PillStep key={i} label={s.label} description={s.description} index={i} color={palette[i]} />
        ))
      case 'ribbon-arrows':
        return steps.map((s, i) => (
          <RibbonStep key={i} label={s.label} description={s.description} index={i} color={palette[i]} isFirst={i === 0} isLast={i === steps.length - 1} textColor={textColor} direction={direction} />
        ))
      case 'numbered':
        return steps.map((s, i) => (
          <NumberedStep key={i} label={s.label} description={s.description} index={i} color={palette[i]} />
        ))
      case 'zigzag':
        return steps.map((s, i) => (
          <ZigzagStep key={i} label={s.label} description={s.description} index={i} color={palette[i]} direction={direction} />
        ))
      case 'timeline':
      default:
        return steps.map((s, i) => (
          <TimelineStep key={i} label={s.label} description={s.description} index={i} color={palette[i]} />
        ))
    }
  }

  const needsConnector = variant === 'timeline' || variant === 'chain' || variant === 'pills' || variant === 'numbered'
  const connectorVariant = variant === 'pills' ? 'dot' : variant === 'numbered' ? 'dashed' : 'arrow'

  const stepsWithConnectors = () => {
    const result: React.ReactNode[] = []
    const rendered = renderSteps()
    rendered.forEach((node, i) => {
      result.push(node)
      if (needsConnector && i < rendered.length - 1) {
        result.push(
          <ConnectorArrow
            key={`c-${i}`}
            direction={direction}
            variant={connectorVariant}
            size={32}
          />
        )
      }
    })
    return result
  }

  // Use wider spacing for variants with connectors; ribbon-arrows use 0 gap (overlap via negative margin)
  const effectiveGap = variant === 'ribbon-arrows' ? 0 : gap

  return (
    <div className={`flex ${isH ? 'flex-row' : 'flex-col'} items-center`} style={{ gap: `${effectiveGap}px` }}>
      {stepsWithConnectors()}
    </div>
  )
}

export default function SequenceEngine({ title, body, steps, variant, direction = 'horizontal', gap, titleSize, bodySize, titleColor, textColor, colorPalette }: SequenceSlideData) {
  return (
    <motion.div
      className="flex flex-col gap-6 h-full justify-center"
      variants={motionConfig.stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <EngineTitle title={title} body={body} titleSize={titleSize} bodySize={bodySize} titleColor={titleColor} textColor={textColor} />
      <SequenceDiagram steps={steps} variant={variant} direction={direction} gap={gap} textColor={textColor} colorPalette={colorPalette} />
    </motion.div>
  )
}
