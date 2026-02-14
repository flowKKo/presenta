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

/** Preset color palettes — 10 schemes × 6 colors each */
export const COLOR_PALETTES: Record<string, { name: string; colors: string[] }> = {
  default:  { name: '经典',   colors: ['#546E7A', '#78909C', '#4CAF50', '#81C784', '#E57373', '#EF9A9A'] },
  ocean:    { name: '海洋',   colors: ['#0D47A1', '#1565C0', '#1976D2', '#2196F3', '#42A5F5', '#64B5F6'] },
  forest:   { name: '翠林',   colors: ['#1B5E20', '#2E7D32', '#388E3C', '#43A047', '#66BB6A', '#81C784'] },
  sunset:   { name: '日暮',   colors: ['#E65100', '#F4511E', '#FF7043', '#EC407A', '#AB47BC', '#7E57C2'] },
  lavender: { name: '薰衣草', colors: ['#4A148C', '#6A1B9A', '#7B1FA2', '#9C27B0', '#BA68C8', '#CE93D8'] },
  morandi:  { name: '莫兰迪', colors: ['#8D6E63', '#A1887F', '#90A4AE', '#A5D6A7', '#CE93D8', '#FFAB91'] },
  mono:     { name: '极简',   colors: ['#212121', '#424242', '#616161', '#757575', '#9E9E9E', '#BDBDBD'] },
  ember:    { name: '暖阳',   colors: ['#BF360C', '#D84315', '#E64A19', '#FF6D00', '#FF8F00', '#FFA000'] },
  nordic:   { name: '北欧',   colors: ['#37474F', '#455A64', '#546E7A', '#78909C', '#80CBC4', '#80DEEA'] },
  candy:    { name: '糖果',   colors: ['#F06292', '#BA68C8', '#64B5F6', '#4DD0E1', '#81C784', '#FFD54F'] },
}

/** Generate N gradient colors, cycling through a named palette */
export function generateGradientColors(count: number, paletteName?: string): string[] {
  if (count <= 0) return []
  const pal = (paletteName && COLOR_PALETTES[paletteName]?.colors) || COLOR_PALETTES.default.colors
  if (count === 1) return [pal[0]]
  return Array.from({ length: count }, (_, i) => pal[i % pal.length])
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
