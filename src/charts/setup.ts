import * as echarts from 'echarts/core'
import {
  BarChart, LineChart, PieChart, RadarChart,
  TreemapChart, SankeyChart, HeatmapChart, SunburstChart,
  BoxplotChart, CustomChart, ScatterChart, GaugeChart,
} from 'echarts/charts'
import {
  GridComponent, TooltipComponent, LegendComponent, VisualMapComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { echartsTheme } from '../theme/swiss'

echarts.use([
  // Charts
  BarChart, LineChart, PieChart, RadarChart,
  TreemapChart, SankeyChart, HeatmapChart, SunburstChart,
  BoxplotChart, CustomChart, ScatterChart, GaugeChart,
  // Components
  GridComponent, TooltipComponent, LegendComponent, VisualMapComponent,
  // Renderer
  CanvasRenderer,
])

echarts.registerTheme('swiss', echartsTheme)

export { echarts }
