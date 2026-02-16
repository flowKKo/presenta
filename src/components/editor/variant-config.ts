/** Shared variant/mode config used by both LayoutPicker (slide-level) and BlockLayoutPicker (block-level). */

export interface VariantOption {
  value: string
  label: string
}

export interface VariantConfig {
  field: string
  options: VariantOption[]
}

export const VARIANT_OPTIONS: Record<string, VariantConfig> = {
  'grid-item': {
    field: 'variant',
    options: [
      { value: 'solid', label: '填充' },
      { value: 'outline', label: '描边' },
      { value: 'sideline', label: '侧线' },
      { value: 'topline', label: '顶线' },
      { value: 'top-circle', label: '圆形' },
      { value: 'joined', label: '连接' },
      { value: 'leaf', label: '叶片' },
      { value: 'labeled', label: '标签' },
      { value: 'alternating', label: '交替' },
      { value: 'pillar', label: '柱体' },
      { value: 'diamonds', label: '菱形' },
      { value: 'signs', label: '标牌' },
    ],
  },
  'sequence': {
    field: 'variant',
    options: [
      { value: 'timeline', label: '时间线' },
      { value: 'chain', label: '链式' },
      { value: 'arrows', label: '箭头' },
      { value: 'pills', label: '胶囊' },
      { value: 'ribbon-arrows', label: '丝带' },
      { value: 'numbered', label: '编号' },
      { value: 'zigzag', label: '折线' },
    ],
  },
  'compare': {
    field: 'mode',
    options: [
      { value: 'versus', label: '对比' },
      { value: 'quadrant', label: '象限' },
      { value: 'iceberg', label: '冰山' },
    ],
  },
  'funnel': {
    field: 'variant',
    options: [
      { value: 'funnel', label: '漏斗' },
      { value: 'pyramid', label: '金字塔' },
      { value: 'slope', label: '斜坡' },
    ],
  },
  'concentric': {
    field: 'variant',
    options: [
      { value: 'circles', label: '圆环' },
      { value: 'diamond', label: '菱形' },
      { value: 'target', label: '靶心' },
    ],
  },
  'hub-spoke': {
    field: 'variant',
    options: [
      { value: 'orbit', label: '轨道' },
      { value: 'solar', label: '太阳' },
      { value: 'pinwheel', label: '风车' },
    ],
  },
  'venn': {
    field: 'variant',
    options: [
      { value: 'classic', label: '经典' },
      { value: 'linear', label: '线性' },
      { value: 'linear-filled', label: '填充线性' },
    ],
  },
  'cycle': {
    field: 'variant',
    options: [
      { value: 'circular', label: '圆形' },
      { value: 'gear', label: '齿轮' },
      { value: 'loop', label: '环形' },
    ],
  },
  'table': {
    field: 'variant',
    options: [
      { value: 'striped', label: '条纹' },
      { value: 'bordered', label: '边框' },
      { value: 'highlight', label: '高亮' },
    ],
  },
  'roadmap': {
    field: 'variant',
    options: [
      { value: 'horizontal', label: '水平' },
      { value: 'vertical', label: '垂直' },
      { value: 'milestone', label: '里程碑' },
    ],
  },
  'stack': {
    field: 'variant',
    options: [
      { value: 'horizontal', label: '水平' },
      { value: 'vertical', label: '垂直' },
      { value: 'offset', label: '偏移' },
    ],
  },
  'chart': {
    field: 'chartType',
    options: [
      { value: 'bar', label: '柱状' },
      { value: 'horizontal-bar', label: '横向柱状' },
      { value: 'stacked-bar', label: '堆叠柱状' },
      { value: 'pie', label: '饼图' },
      { value: 'donut', label: '圆环' },
      { value: 'rose', label: '玫瑰' },
      { value: 'line', label: '折线' },
      { value: 'area', label: '面积' },
      { value: 'radar', label: '雷达' },
      { value: 'proportion', label: '比例' },
      { value: 'waterfall', label: '瀑布' },
      { value: 'combo', label: '组合' },
      { value: 'scatter', label: '散点' },
      { value: 'gauge', label: '仪表盘' },
      { value: 'treemap', label: '矩形树图' },
      { value: 'sankey', label: '桑基图' },
      { value: 'heatmap', label: '热力图' },
      { value: 'sunburst', label: '旭日图' },
      { value: 'boxplot', label: '箱线图' },
      { value: 'gantt', label: '甘特图' },
    ],
  },
}
