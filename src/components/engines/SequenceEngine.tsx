import { motion } from 'framer-motion'
import type { SequenceSlideData } from '../../data/types'
import { colors, motionConfig, generateGradientColors } from '../../theme/swiss'
import EngineTitle from './shared/EngineTitle'
import ConnectorArrow from './shared/ConnectorArrow'
import EditableText from '../editor/EditableText'

function TimelineStep({ label, description, index, color }: { label: string; description?: string; index: number; color: string }) {
  return (
    <motion.div variants={motionConfig.child} className="flex flex-col items-center text-center flex-1 min-w-0">
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold mb-2" style={{ backgroundColor: color }}>
        {index + 1}
      </div>
      <EditableText value={label} field={`steps.${index}.label`} as="div" className="text-sm font-semibold" style={{ color: colors.textPrimary }} />
      {description && <EditableText value={description} field={`steps.${index}.description`} as="div" className="text-xs mt-1" style={{ color: colors.textSecondary }} />}
    </motion.div>
  )
}

function ChainStep({ label, description, index, color }: { label: string; description?: string; index: number; color: string }) {
  return (
    <motion.div variants={motionConfig.child} className="flex-1 min-w-0 rounded-lg p-4" style={{ borderLeft: `4px solid ${color}`, background: colors.card }}>
      <EditableText value={label} field={`steps.${index}.label`} as="div" className="text-sm font-semibold" style={{ color: colors.textPrimary }} />
      {description && <EditableText value={description} field={`steps.${index}.description`} as="div" className="text-xs mt-1" style={{ color: colors.textSecondary }} />}
    </motion.div>
  )
}

function ArrowStep({ label, description, index, color, textColor }: { label: string; description?: string; index: number; color: string; textColor?: string }) {
  return (
    <motion.div variants={motionConfig.child} className="flex-1 min-w-0 rounded-lg p-4 text-center" style={{ background: color }}>
      <EditableText value={label} field={`steps.${index}.label`} as="div" className="text-sm font-bold" style={{ color: textColor || 'white' }} />
      {description && <EditableText value={description} field={`steps.${index}.description`} as="div" className="text-xs mt-1" style={{ color: textColor || 'white', opacity: 0.8 }} />}
    </motion.div>
  )
}

function PillStep({ label, description, index, color, textColor }: { label: string; description?: string; index: number; color: string; textColor?: string }) {
  return (
    <motion.div variants={motionConfig.child} className="flex-1 min-w-0 flex flex-col items-center text-center">
      <EditableText value={label} field={`steps.${index}.label`} as="div" className="rounded-full px-5 py-2 text-sm font-semibold" style={{ backgroundColor: color, color: textColor || 'white' }} />
      {description && <EditableText value={description} field={`steps.${index}.description`} as="div" className="text-xs mt-2" style={{ color: colors.textSecondary }} />}
    </motion.div>
  )
}

function RibbonStep({ label, description, index, color, isLast, textColor }: { label: string; description?: string; index: number; color: string; isLast: boolean; textColor?: string }) {
  return (
    <motion.div variants={motionConfig.child} className="flex-1 min-w-0 relative" style={!isLast ? { marginRight: '-4%' } : undefined}>
      <div className="p-4 text-center" style={{ backgroundColor: color, clipPath: isLast ? undefined : 'polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)' }}>
        <EditableText value={label} field={`steps.${index}.label`} as="div" className="text-sm font-bold" style={{ color: textColor || 'white' }} />
        {description && <EditableText value={description} field={`steps.${index}.description`} as="div" className="text-xs mt-1" style={{ color: textColor || 'white', opacity: 0.8 }} />}
      </div>
    </motion.div>
  )
}

function NumberedStep({ label, description, index, color }: { label: string; description?: string; index: number; color: string }) {
  return (
    <motion.div variants={motionConfig.child} className="flex-1 min-w-0 flex items-start gap-3">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-extrabold shrink-0"
        style={{ backgroundColor: `${color}18`, color }}
      >
        {index + 1}
      </div>
      <div className="flex flex-col pt-1">
        <EditableText value={label} field={`steps.${index}.label`} as="div" className="text-sm font-semibold" style={{ color: colors.textPrimary }} />
        {description && <EditableText value={description} field={`steps.${index}.description`} as="div" className="text-xs mt-1" style={{ color: colors.textSecondary }} />}
      </div>
    </motion.div>
  )
}

function ZigzagStep({ label, description, index, color }: { label: string; description?: string; index: number; color: string }) {
  const isEven = index % 2 === 0
  return (
    <motion.div variants={motionConfig.child} className="flex-1 min-w-0 flex flex-col items-center text-center">
      {!isEven && <div className="h-6" />}
      <div className="rounded-xl p-4 w-full" style={{ background: `${color}14`, borderTop: `3px solid ${color}` }}>
        <EditableText value={label} field={`steps.${index}.label`} as="div" className="text-sm font-semibold" style={{ color: colors.textPrimary }} />
        {description && <EditableText value={description} field={`steps.${index}.description`} as="div" className="text-xs mt-1" style={{ color: colors.textSecondary }} />}
      </div>
      {isEven && <div className="h-6" />}
    </motion.div>
  )
}

export function SequenceDiagram({ steps, variant, direction = 'horizontal', gap = 8, textColor, colorPalette }: { steps: SequenceSlideData['steps']; variant: SequenceSlideData['variant']; direction?: 'horizontal' | 'vertical'; gap?: number; textColor?: string; colorPalette?: string }) {
  const isH = direction === 'horizontal'
  const palette = generateGradientColors(steps.length, colorPalette)

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
          <PillStep key={i} label={s.label} description={s.description} index={i} color={palette[i]} textColor={textColor} />
        ))
      case 'ribbon-arrows':
        return steps.map((s, i) => (
          <RibbonStep key={i} label={s.label} description={s.description} index={i} color={palette[i]} isLast={i === steps.length - 1} textColor={textColor} />
        ))
      case 'numbered':
        return steps.map((s, i) => (
          <NumberedStep key={i} label={s.label} description={s.description} index={i} color={palette[i]} />
        ))
      case 'zigzag':
        return steps.map((s, i) => (
          <ZigzagStep key={i} label={s.label} description={s.description} index={i} color={palette[i]} />
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
            size={24}
          />
        )
      }
    })
    return result
  }

  return (
    <div className={`flex ${isH ? 'flex-row' : 'flex-col'} items-center`} style={{ gap: `${gap}px` }}>
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
