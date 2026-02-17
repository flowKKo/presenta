import { motion } from 'framer-motion'
import type { GridItemSlideData, GridItemEntry } from '../../data/types'
import { colors, motionConfig, generateGradientColors } from '../../theme/swiss'
import EngineTitle from './shared/EngineTitle'
import EditableText from '../editor/EditableText'

const colorMap: Record<string, string> = {
  positive: colors.accentPositive,
  negative: colors.accentNegative,
  neutral: colors.accentNeutral,
}

function getColumns(count: number, override?: number): number {
  if (override != null && override > 0) return override
  if (count <= 3) return count
  if (count <= 6) return 3
  return 4
}

function CardContent({ item, index, showIcon = true }: { item: GridItemEntry; index: number; showIcon?: boolean }) {
  return (
    <>
      {showIcon && item.icon && (
        <span className="text-4xl mb-2 block">{item.icon}</span>
      )}
      {item.value && (
        <EditableText
          value={item.value}
          field={`items.${index}.value`}
          as="div"
          className="text-4xl font-extrabold mb-1"
          style={{ color: item.valueColor ? colorMap[item.valueColor] : colors.accentNeutral }}
        />
      )}
      <EditableText
        value={item.title}
        field={`items.${index}.title`}
        as="div"
        className="text-xl font-semibold"
        style={{ color: colors.textPrimary }}
      />
      {item.description && (
        <EditableText
          value={item.description}
          field={`items.${index}.description`}
          as="div"
          className="text-base mt-1"
          style={{ color: colors.textSecondary }}
        />
      )}
    </>
  )
}

function SolidCard({ item, index }: { item: GridItemEntry; index: number }) {
  return (
    <motion.div
      variants={motionConfig.child}
      className="rounded-xl p-5 flex flex-col justify-center h-full"
      style={{ background: colors.card, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
    >
      <CardContent item={item} index={index} />
    </motion.div>
  )
}

function OutlineCard({ item, index }: { item: GridItemEntry; index: number }) {
  return (
    <motion.div
      variants={motionConfig.child}
      className="rounded-xl p-5 flex flex-col justify-center h-full"
      style={{ border: `2px solid ${colors.border}` }}
    >
      <CardContent item={item} index={index} />
    </motion.div>
  )
}

function SidelineCard({ item, index, color }: { item: GridItemEntry; index: number; color: string }) {
  return (
    <motion.div
      variants={motionConfig.child}
      className="rounded-lg p-5 flex flex-col justify-center h-full"
      style={{ borderLeft: `4px solid ${color}`, background: colors.card }}
    >
      <CardContent item={item} index={index} />
    </motion.div>
  )
}

function ToplineCard({ item, index, color }: { item: GridItemEntry; index: number; color: string }) {
  return (
    <motion.div
      variants={motionConfig.child}
      className="rounded-lg p-5 flex flex-col justify-center h-full"
      style={{ borderTop: `4px solid ${color}`, background: colors.card }}
    >
      <CardContent item={item} index={index} />
    </motion.div>
  )
}

function TopCircleCard({ item, index, color, textColor }: { item: GridItemEntry; index: number; color: string; textColor?: string }) {
  return (
    <motion.div variants={motionConfig.child} className="flex flex-col items-center text-center justify-center h-full">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mb-4"
        style={{ backgroundColor: color, color: textColor || 'white' }}
      >
        {item.icon || (index + 1)}
      </div>
      {item.value && (
        <EditableText
          value={item.value}
          field={`items.${index}.value`}
          as="div"
          className="text-4xl font-extrabold mb-1"
          style={{ color: item.valueColor ? colorMap[item.valueColor] : colors.accentNeutral }}
        />
      )}
      <EditableText
        value={item.title}
        field={`items.${index}.title`}
        as="div"
        className="text-lg font-semibold"
        style={{ color: colors.textPrimary }}
      />
      {item.description && (
        <EditableText
          value={item.description}
          field={`items.${index}.description`}
          as="div"
          className="text-base mt-1"
          style={{ color: colors.textSecondary }}
        />
      )}
    </motion.div>
  )
}

function JoinedCard({ item, index, color }: { item: GridItemEntry; index: number; color: string }) {
  return (
    <motion.div
      variants={motionConfig.child}
      className="p-5 flex flex-col justify-center h-full"
      style={{ background: `${color}10`, borderBottom: `3px solid ${color}` }}
    >
      <CardContent item={item} index={index} />
    </motion.div>
  )
}

function LeafCard({ item, index, color }: { item: GridItemEntry; index: number; color: string }) {
  return (
    <motion.div
      variants={motionConfig.child}
      className="p-5 flex flex-col justify-center h-full"
      style={{ background: `${color}0D`, borderRadius: '24px 4px 24px 4px' }}
    >
      <CardContent item={item} index={index} />
    </motion.div>
  )
}

function LabeledCard({ item, index, color }: { item: GridItemEntry; index: number; color: string }) {
  return (
    <motion.div variants={motionConfig.child} className="flex flex-col justify-center h-full">
      {item.icon && (
        <span className="text-4xl mb-2 block">{item.icon}</span>
      )}
      <EditableText
        value={item.value || `#${index + 1}`}
        field={`items.${index}.value`}
        as="div"
        className="inline-flex self-start rounded-full px-3 py-1 text-xs font-bold mb-2"
        style={{ backgroundColor: `${color}20`, color: color }}
      />
      <EditableText value={item.title} field={`items.${index}.title`} as="div" className="text-xl font-semibold" style={{ color: colors.textPrimary }} />
      {item.description && (
        <EditableText value={item.description} field={`items.${index}.description`} as="div" className="text-base mt-1" style={{ color: colors.textSecondary }} />
      )}
    </motion.div>
  )
}

function AlternatingCard({ item, index, color }: { item: GridItemEntry; index: number; color: string }) {
  const isEven = index % 2 === 0
  return (
    <motion.div
      variants={motionConfig.child}
      className="rounded-xl p-5 flex flex-col justify-center h-full"
      style={{ background: isEven ? `${color}12` : colors.card, boxShadow: isEven ? undefined : '0 2px 8px rgba(0,0,0,0.04)' }}
    >
      <CardContent item={item} index={index} />
    </motion.div>
  )
}

function PillarCard({ item, index, color, textColor }: { item: GridItemEntry; index: number; color: string; textColor?: string }) {
  return (
    <motion.div
      variants={motionConfig.child}
      className="rounded-xl flex flex-col h-full overflow-hidden"
      style={{ border: `2px solid ${color}30` }}
    >
      <div className="px-4 py-3 text-center flex items-center justify-center gap-2" style={{ background: color }}>
        {item.icon && <span>{item.icon}</span>}
        <EditableText value={item.title} field={`items.${index}.title`} as="div" className="text-base font-bold" style={{ color: textColor || 'white' }} />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-center" style={{ background: `${color}08` }}>
        {item.value && (
          <EditableText value={item.value} field={`items.${index}.value`} as="div" className="text-3xl font-extrabold mb-1 text-center" style={{ color: item.valueColor ? colorMap[item.valueColor] : color }} />
        )}
        {item.description && (
          <EditableText value={item.description} field={`items.${index}.description`} as="div" className="text-sm text-center" style={{ color: colors.textSecondary }} />
        )}
      </div>
    </motion.div>
  )
}

function DiamondCard({ item, index, color }: { item: GridItemEntry; index: number; color: string }) {
  return (
    <motion.div variants={motionConfig.child} className="flex flex-col items-center text-center justify-center h-full">
      <div className="relative w-16 h-16 mb-3 flex items-center justify-center">
        <div className="absolute inset-0 rotate-45 rounded-md" style={{ backgroundColor: color, opacity: 0.15 }} />
        <div className="absolute inset-2 rotate-45 rounded-sm" style={{ backgroundColor: color }} />
        <span className="relative text-sm font-bold text-white z-10">{item.icon || (index + 1)}</span>
      </div>
      <CardContent item={item} index={index} showIcon={false} />
    </motion.div>
  )
}

function SignCard({ item, index, color }: { item: GridItemEntry; index: number; color: string }) {
  return (
    <motion.div variants={motionConfig.child} className="flex flex-col items-center h-full">
      <div className="w-full rounded-lg p-4 text-center relative flex items-center justify-center gap-2" style={{ background: color }}>
        {item.icon && <span>{item.icon}</span>}
        <EditableText value={item.title} field={`items.${index}.title`} as="div" className="text-base font-bold" style={{ color: 'white' }} />
        {/* sign post triangle */}
        <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0" style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: `8px solid ${color}` }} />
      </div>
      <div className="mt-4 text-center">
        {item.value && (
          <EditableText value={item.value} field={`items.${index}.value`} as="div" className="text-3xl font-extrabold mb-1" style={{ color: item.valueColor ? colorMap[item.valueColor] : colors.accentNeutral }} />
        )}
        {item.description && (
          <EditableText value={item.description} field={`items.${index}.description`} as="div" className="text-sm" style={{ color: colors.textSecondary }} />
        )}
      </div>
    </motion.div>
  )
}

export function GridItemDiagram({ items, variant, columns, gap = 16, textColor, colorPalette }: { items: GridItemEntry[]; variant: GridItemSlideData['variant']; columns?: number; gap?: number; textColor?: string; colorPalette?: string }) {
  if (items.length === 0) return null
  const cols = getColumns(items.length, columns)
  const rows = Math.ceil(items.length / cols)
  const palette = generateGradientColors(items.length, colorPalette)

  return (
    <div
      className="grid flex-1 min-h-0"
      style={{
        gap: `${gap}px`,
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
    >
      {items.map((item, i) => {
        switch (variant) {
          case 'outline':
            return <OutlineCard key={i} item={item} index={i} />
          case 'sideline':
            return <SidelineCard key={i} item={item} index={i} color={palette[i]} />
          case 'topline':
            return <ToplineCard key={i} item={item} index={i} color={palette[i]} />
          case 'top-circle':
            return <TopCircleCard key={i} item={item} index={i} color={palette[i]} textColor={textColor} />
          case 'joined':
            return <JoinedCard key={i} item={item} index={i} color={palette[i]} />
          case 'leaf':
            return <LeafCard key={i} item={item} index={i} color={palette[i]} />
          case 'labeled':
            return <LabeledCard key={i} item={item} index={i} color={palette[i]} />
          case 'alternating':
            return <AlternatingCard key={i} item={item} index={i} color={palette[i]} />
          case 'pillar':
            return <PillarCard key={i} item={item} index={i} color={palette[i]} textColor={textColor} />
          case 'diamonds':
            return <DiamondCard key={i} item={item} index={i} color={palette[i]} />
          case 'signs':
            return <SignCard key={i} item={item} index={i} color={palette[i]} />
          default:
            return <SolidCard key={i} item={item} index={i} />
        }
      })}
    </div>
  )
}

export default function GridItemEngine({ title, body, items, variant, columns, gap, titleSize, bodySize, titleColor, textColor, colorPalette }: GridItemSlideData) {
  return (
    <motion.div
      className="flex flex-col gap-6 h-full"
      variants={motionConfig.stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <EngineTitle title={title} body={body} titleSize={titleSize} bodySize={bodySize} titleColor={titleColor} textColor={textColor} />
      <GridItemDiagram items={items} variant={variant} columns={columns} gap={gap} textColor={textColor} colorPalette={colorPalette} />
    </motion.div>
  )
}
