import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts/core'
import { CustomChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { echartsTheme, getChartPalette } from '../theme/swiss'
import type { GanttTask } from '../data/types'

echarts.use([CustomChart, GridComponent, TooltipComponent, CanvasRenderer])
echarts.registerTheme('swiss', echartsTheme)

interface GanttChartProps {
  tasks: GanttTask[]
  height?: number
  colorPalette?: string
}

export default function GanttChart({ tasks, height, colorPalette }: GanttChartProps) {
  const pal = getChartPalette(colorPalette)

  // Group by category for coloring
  const categories = [...new Set(tasks.map(t => t.category || '默认'))]
  const taskNames = tasks.map(t => t.name).reverse()

  const option = {
    tooltip: {
      formatter: (params: { value: number[]; name: string }) => {
        const task = tasks[tasks.length - 1 - params.value[1]]
        if (!task) return ''
        return `<b>${task.name}</b><br/>开始: ${task.start}<br/>结束: ${task.end}<br/>时长: ${task.end - task.start}`
      },
    },
    grid: {
      left: 12,
      right: 12,
      top: 12,
      bottom: 12,
      containLabel: true,
    },
    xAxis: {
      type: 'value' as const,
      min: Math.min(...tasks.map(t => t.start)),
      max: Math.max(...tasks.map(t => t.end)),
    },
    yAxis: {
      type: 'category' as const,
      data: taskNames,
      axisLabel: { fontSize: 12 },
    },
    series: [
      {
        type: 'custom' as const,
        renderItem: (_params: unknown, api: {
          value: (dim: number) => number
          coord: (val: [number, number]) => [number, number]
          size: (val: [number, number]) => [number, number]
          style: (extra?: Record<string, unknown>) => Record<string, unknown>
        }) => {
          const taskIdx = api.value(1)
          const start = api.coord([api.value(0), taskIdx])
          const end = api.coord([api.value(0) + api.value(2), taskIdx])
          const barHeight = api.size([0, 1])[1] * 0.6
          const task = tasks[tasks.length - 1 - taskIdx]
          const catIdx = categories.indexOf(task?.category || '默认')
          const color = pal[catIdx % pal.length]

          return {
            type: 'rect' as const,
            shape: {
              x: start[0],
              y: start[1] - barHeight / 2,
              width: end[0] - start[0],
              height: barHeight,
              r: [4, 4, 4, 4],
            },
            style: {
              ...api.style(),
              fill: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color },
                { offset: 1, color: `${color}99` },
              ]),
            },
          }
        },
        dimensions: ['start', 'index', 'duration'],
        encode: {
          x: [0, 2],
          y: 1,
        },
        data: tasks.map((task, i) => [task.start, tasks.length - 1 - i, task.end - task.start]),
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
