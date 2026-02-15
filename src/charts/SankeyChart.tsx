import ReactECharts from 'echarts-for-react'
import './setup'
import { getChartPalette } from '../theme/swiss'
import type { SankeyNode, SankeyLink } from '../data/types'

interface SankeyChartProps {
  nodes: SankeyNode[]
  links: SankeyLink[]
  height?: number
  colorPalette?: string
}

export default function SankeyChart({ nodes, links, height, colorPalette }: SankeyChartProps) {
  const pal = getChartPalette(colorPalette)

  const coloredNodes = nodes.map((node, i) => ({
    ...node,
    itemStyle: { color: pal[i % pal.length] },
  }))

  const option = {
    tooltip: {
      trigger: 'item' as const,
      triggerOn: 'mousemove' as const,
    },
    series: [
      {
        type: 'sankey' as const,
        data: coloredNodes,
        links,
        orient: 'horizontal' as const,
        nodeAlign: 'justify' as const,
        layoutIterations: 32,
        nodeWidth: 20,
        nodeGap: 12,
        label: {
          show: true,
          fontSize: 13,
          fontWeight: 500,
        },
        lineStyle: {
          color: 'gradient' as const,
          opacity: 0.4,
          curveness: 0.5,
        },
        emphasis: {
          focus: 'adjacency' as const,
          lineStyle: { opacity: 0.7 },
        },
        animationDuration: 800,
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
