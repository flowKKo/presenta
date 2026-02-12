import { motion } from 'framer-motion'
import type { GridItemSlideData, GridItemEntry } from '../../data/types'
import { colors, motionConfig, generateGradientColors } from '../../theme/swiss'
import EngineTitle from './shared/EngineTitle'

const colorMap: Record<string, string> = {
  positive: colors.accentPositive,
  negative: colors.accentNegative,
  neutral: colors.accentNeutral,
}

function getColumns(count: number, override?: number): number {
  if (override) return override
  if (count <= 3) return count
  if (count <= 6) return 3
  return 4
}

function CardContent({ item }: { item: GridItemEntry }) {
  return (
    <>
      {item.value && (
        <div
          className="text-3xl font-extrabold mb-1"
          style={{ color: item.valueColor ? colorMap[item.valueColor] : colors.accentNeutral }}
        >
          {item.value}
        </div>
      )}
      <div className="text-base font-semibold" style={{ color: colors.textPrimary }}>
        {item.title}
      </div>
      {item.description && (
        <div className="text-sm mt-1" style={{ color: colors.textSecondary }}>
          {item.description}
        </div>
      )}
    </>
  )
}

function SolidCard({ item }: { item: GridItemEntry }) {
  return (
    <motion.div
      variants={motionConfig.child}
      className="rounded-xl p-5"
      style={{ background: colors.card, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
    >
      <CardContent item={item} />
    </motion.div>
  )
}

function OutlineCard({ item }: { item: GridItemEntry }) {
  return (
    <motion.div
      variants={motionConfig.child}
      className="rounded-xl p-5"
      style={{ border: `2px solid ${colors.border}` }}
    >
      <CardContent item={item} />
    </motion.div>
  )
}

function SidelineCard({ item, color }: { item: GridItemEntry; color: string }) {
  return (
    <motion.div
      variants={motionConfig.child}
      className="rounded-lg p-5"
      style={{ borderLeft: `4px solid ${color}`, background: colors.card }}
    >
      <CardContent item={item} />
    </motion.div>
  )
}

function ToplineCard({ item, color }: { item: GridItemEntry; color: string }) {
  return (
    <motion.div
      variants={motionConfig.child}
      className="rounded-lg p-5"
      style={{ borderTop: `4px solid ${color}`, background: colors.card }}
    >
      <CardContent item={item} />
    </motion.div>
  )
}

function TopCircleCard({ item, index, color }: { item: GridItemEntry; index: number; color: string }) {
  return (
    <motion.div variants={motionConfig.child} className="flex flex-col items-center text-center">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold mb-3"
        style={{ backgroundColor: color }}
      >
        {index + 1}
      </div>
      <CardContent item={item} />
    </motion.div>
  )
}

export default function GridItemEngine({ title, body, items, variant, columns }: GridItemSlideData) {
  const cols = getColumns(items.length, columns)
  const palette = generateGradientColors(items.length)

  return (
    <motion.div
      className="flex flex-col gap-6 h-full justify-center"
      variants={motionConfig.stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <EngineTitle title={title} body={body} />
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {items.map((item, i) => {
          switch (variant) {
            case 'outline':
              return <OutlineCard key={i} item={item} />
            case 'sideline':
              return <SidelineCard key={i} item={item} color={palette[i]} />
            case 'topline':
              return <ToplineCard key={i} item={item} color={palette[i]} />
            case 'top-circle':
              return <TopCircleCard key={i} item={item} index={i} color={palette[i]} />
            default: // solid + all others fallback
              return <SolidCard key={i} item={item} />
          }
        })}
      </div>
    </motion.div>
  )
}
