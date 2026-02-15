import ReactECharts from 'echarts-for-react'
import { echarts } from './setup'
import { colors, getChartPalette } from '../theme/swiss'

const semanticColorMap: Record<string, string> = {
  positive: colors.accentPositive,
  negative: colors.accentNegative,
  neutral: colors.accentNeutral,
}

interface BarChartProps {
  categories: string[]
  series: { name: string; data: number[]; color?: string }[]
  height?: number
  colorPalette?: string
  orientation?: 'horizontal' | 'vertical'
  stacked?: boolean
}

export default function BarChart({ categories, series, height, colorPalette, orientation = 'vertical', stacked = false }: BarChartProps) {
  const pal = getChartPalette(colorPalette)
  const hasLegend = series.length > 1
  const isHorizontal = orientation === 'horizontal'
  const displayCategories = isHorizontal ? [...categories].reverse() : categories

  const categoryAxis = {
    type: 'category' as const,
    data: displayCategories,
  }
  const valueAxis = {
    type: 'value' as const,
  }

  const option = {
    tooltip: { trigger: 'axis' as const },
    legend: {
      show: hasLegend,
      bottom: 0,
    },
    grid: {
      left: 12,
      right: isHorizontal ? 24 : 12,
      top: 24,
      bottom: hasLegend ? 40 : 12,
      containLabel: true,
    },
    xAxis: isHorizontal ? valueAxis : categoryAxis,
    yAxis: isHorizontal ? categoryAxis : valueAxis,
    series: series.map((s, i) => {
      const baseColor = s.color
        ? (semanticColorMap[s.color] || s.color)
        : pal[i % pal.length]

      const seriesData = isHorizontal ? [...s.data].reverse() : s.data

      return {
        name: s.name,
        type: 'bar' as const,
        data: seriesData,
        ...(stacked ? { stack: 'total' } : {}),
        itemStyle: {
          color: isHorizontal
            ? new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: `${baseColor}88` },
                { offset: 1, color: baseColor },
              ])
            : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: baseColor },
                { offset: 1, color: `${baseColor}88` },
              ]),
          borderRadius: stacked
            ? (i === series.length - 1 ? (isHorizontal ? [0, 6, 6, 0] : [6, 6, 0, 0]) : 0)
            : (isHorizontal ? [0, 6, 6, 0] : [6, 6, 0, 0]),
        },
        barMaxWidth: 56,
        barGap: '20%',
        emphasis: {
          itemStyle: { shadowBlur: 12, shadowColor: `${baseColor}40` },
        },
        label: {
          show: !stacked,
          position: isHorizontal ? 'right' as const : 'top' as const,
          color: colors.textPrimary,
          fontSize: 13,
          fontWeight: 600,
        },
      }
    }),
    animationEasing: 'cubicOut' as const,
    animationDuration: 800,
  }

  return (
    <ReactECharts
      option={option}
      theme="swiss"
      style={{ height: height ?? '100%', width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  )
}
