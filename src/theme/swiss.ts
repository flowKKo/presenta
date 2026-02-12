export const colors = {
  page: '#EEEEE8',
  slide: '#F5F5F0',
  card: '#FFFFFF',
  textPrimary: '#333333',
  textSecondary: '#757575',
  textCaption: '#9E9E9E',
  accentPositive: '#4CAF50',
  accentNegative: '#E57373',
  accentNeutral: '#546E7A',
  border: 'rgba(0,0,0,0.06)',
  barTrack: '#F0F0EA',
}

export const cardStyle = {
  background: colors.card,
  border: `1px solid ${colors.border}`,
  boxShadow: '0 10px 20px rgba(0,0,0,0.04)',
}

export const chartPalette = [
  '#546E7A', '#4CAF50', '#E57373', '#42A5F5',
  '#FFB74D', '#AB47BC', '#78909C', '#81C784',
  '#EF9A9A', '#64B5F6',
]

export const echartsTheme = {
  color: chartPalette,
  backgroundColor: 'transparent',
  textStyle: {
    color: '#333333',
    fontFamily: 'Inter, HarmonyOS Sans, Source Han Sans, sans-serif',
  },
  title: {
    textStyle: { color: '#333333', fontWeight: 600 },
  },
  tooltip: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderColor: 'rgba(0,0,0,0.08)',
    borderWidth: 1,
    textStyle: { color: '#333333', fontSize: 13 },
    extraCssText: 'box-shadow: 0 4px 16px rgba(0,0,0,0.08); border-radius: 8px; padding: 10px 14px;',
  },
  legend: {
    textStyle: { color: '#757575', fontSize: 13 },
    itemWidth: 14,
    itemHeight: 10,
    itemGap: 16,
  },
  categoryAxis: {
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: { color: '#757575', fontSize: 13 },
  },
  valueAxis: {
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: true, lineStyle: { color: 'rgba(0,0,0,0.04)', type: 'dashed' as const } },
    axisLabel: { show: true, color: '#9E9E9E', fontSize: 11 },
  },
  bar: {
    itemStyle: { borderRadius: [6, 6, 0, 0] },
    barMaxWidth: 56,
  },
  line: {
    smooth: true,
    symbolSize: 6,
    lineStyle: { width: 2.5 },
  },
  radar: {
    splitArea: { areaStyle: { color: ['transparent'] } },
    splitLine: { lineStyle: { color: 'rgba(0,0,0,0.06)' } },
    axisLine: { lineStyle: { color: 'rgba(0,0,0,0.06)' } },
    axisName: { color: '#333333', fontSize: 12 },
  },
  pie: {
    itemStyle: { borderRadius: 6, borderColor: '#F5F5F0', borderWidth: 2 },
  },
}

/** Generate N gradient colors from accentNeutral through accentPositive */
export function generateGradientColors(count: number): string[] {
  if (count <= 0) return []
  if (count === 1) return [colors.accentNeutral]
  const palette = [
    colors.accentNeutral,
    '#78909C',
    colors.accentPositive,
    '#81C784',
    colors.accentNegative,
    '#EF9A9A',
  ]
  return Array.from({ length: count }, (_, i) => palette[i % palette.length])
}

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export const motionConfig = {
  slide: {
    initial: { opacity: 0, y: 20 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true, amount: 0.15 } as const,
    transition: { duration: 0.6, ease },
  },
  stagger: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  },
  child: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  },
}
