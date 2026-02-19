import ReactECharts from 'echarts-for-react'
import { echarts } from './setup'
import { colors, getChartPalette } from '../theme/swiss'
import type { GaugeData } from '../data/types'

interface GaugeChartProps {
  data: GaugeData
  height?: number
  colorPalette?: string
}

export default function GaugeChart({ data, height, colorPalette }: GaugeChartProps) {
  const pal = getChartPalette(colorPalette)
  const max = Math.max(data.max ?? 100, 1)
  const ratio = data.value / max

  // Use auto-color (red/yellow/green by ratio) unless a custom palette is explicitly set
  const autoColor = ratio < 0.4 ? '#E57373' : ratio < 0.7 ? '#FFB74D' : '#4CAF50'
  const mainColor = colorPalette ? pal[0] : autoColor

  const option = {
    series: [
      {
        type: 'gauge' as const,
        center: ['50%', '58%'],
        radius: '90%',
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max,
        splitNumber: 5,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: `${mainColor}88` },
            { offset: 1, color: mainColor },
          ]),
        },
        progress: {
          show: true,
          width: 20,
          roundCap: true,
        },
        pointer: {
          show: true,
          length: '60%',
          width: 5,
          itemStyle: { color: mainColor },
        },
        axisLine: {
          lineStyle: {
            width: 20,
            color: [[1, `${colors.textCaption}18`]],
          },
          roundCap: true,
        },
        axisTick: {
          show: true,
          distance: -24,
          length: 4,
          lineStyle: { color: colors.textCaption, width: 1 },
        },
        splitLine: {
          show: true,
          distance: -28,
          length: 10,
          lineStyle: { color: colors.textCaption, width: 1.5 },
        },
        axisLabel: {
          distance: -16,
          color: colors.textCaption,
          fontSize: 11,
        },
        detail: {
          valueAnimation: true,
          formatter: `{value}`,
          fontSize: 32,
          fontWeight: 700,
          color: colors.textPrimary,
          offsetCenter: [0, '40%'],
        },
        title: {
          show: !!data.name,
          offsetCenter: [0, '60%'],
          fontSize: 14,
          color: colors.textSecondary,
        },
        data: [{ value: data.value, name: data.name || '' }],
        animationDuration: 1200,
        animationEasing: 'cubicOut' as const,
      },
    ],
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
