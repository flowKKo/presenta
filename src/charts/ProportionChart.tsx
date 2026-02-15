import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { echartsTheme, colors, getChartPalette } from '../theme/swiss'
import type { ProportionItem } from '../data/types'

echarts.use([BarChart, GridComponent, TooltipComponent, CanvasRenderer])
echarts.registerTheme('swiss', echartsTheme)

interface ProportionChartProps {
  items: ProportionItem[]
  height?: number
  colorPalette?: string
}

export default function ProportionChart({ items, height, colorPalette }: ProportionChartProps) {
  const pal = getChartPalette(colorPalette)
  const displayItems = [...items].reverse()
  const categories = displayItems.map(i => i.name)
  const maxValues = displayItems.map(i => i.max ?? 100)
  const values = displayItems.map(i => i.value)

  const option = {
    tooltip: {
      trigger: 'axis' as const,
      formatter: (params: { name: string; value: number; seriesName: string }[]) => {
        const item = params.find(p => p.seriesName === '值')
        const bg = params.find(p => p.seriesName === '满值')
        if (!item || !bg) return ''
        const pct = bg.value > 0 ? ((item.value / bg.value) * 100).toFixed(1) : '0'
        return `<b>${item.name}</b><br/>${item.value} / ${bg.value} (${pct}%)`
      },
    },
    grid: {
      left: 12,
      right: 48,
      top: 12,
      bottom: 12,
      containLabel: true,
    },
    xAxis: {
      type: 'value' as const,
      show: false,
      max: (v: { max: number }) => Math.max(v.max, 100),
    },
    yAxis: {
      type: 'category' as const,
      data: categories,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: colors.textPrimary,
        fontSize: 13,
        fontWeight: 500,
      },
    },
    series: [
      {
        name: '满值',
        type: 'bar' as const,
        data: maxValues,
        barGap: '-100%',
        barMaxWidth: 24,
        itemStyle: {
          color: `${colors.textCaption}18`,
          borderRadius: [0, 4, 4, 0],
        },
        label: { show: false },
        silent: true,
      },
      {
        name: '值',
        type: 'bar' as const,
        data: values,
        barMaxWidth: 24,
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
          color: (params: { dataIndex: number }) => {
            const baseColor = pal[params.dataIndex % pal.length]
            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: `${baseColor}88` },
              { offset: 1, color: baseColor },
            ])
          },
        },
        label: {
          show: true,
          position: 'right' as const,
          color: colors.textPrimary,
          fontSize: 13,
          fontWeight: 600,
          formatter: (params: { dataIndex: number; value: number }) => {
            const max = maxValues[params.dataIndex]
            const pct = max > 0 ? ((params.value / max) * 100).toFixed(0) : '0'
            return `${pct}%`
          },
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 8,
            shadowColor: 'rgba(0,0,0,0.12)',
          },
        },
      },
    ],
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
