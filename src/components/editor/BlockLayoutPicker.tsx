import type { BlockData } from '../../data/types'

type BlockType = BlockData['type']

interface BlockLayoutPickerProps {
  data: BlockData
  onChange: (data: BlockData) => void
}

const BLOCK_TYPES: { type: BlockType; label: string }[] = [
  { type: 'title-body', label: '标题文本' },
  { type: 'grid-item', label: '网格' },
  { type: 'sequence', label: '序列' },
  { type: 'compare', label: '对比' },
  { type: 'funnel', label: '漏斗' },
  { type: 'concentric', label: '同心圆' },
  { type: 'hub-spoke', label: '轮辐' },
  { type: 'venn', label: '韦恩' },
  { type: 'chart', label: '图表' },
]

const VARIANT_OPTIONS: Partial<Record<BlockType, { field: string; options: { value: string; label: string }[] }>> = {
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
  'chart': {
    field: 'chartType',
    options: [
      { value: 'bar', label: '柱状' },
      { value: 'pie', label: '饼图' },
      { value: 'line', label: '折线' },
      { value: 'radar', label: '雷达' },
    ],
  },
}

function getCurrentVariant(data: BlockData): string | undefined {
  switch (data.type) {
    case 'grid-item': return data.variant
    case 'sequence': return data.variant
    case 'compare': return data.mode
    case 'funnel': return data.variant
    case 'concentric': return data.variant
    case 'hub-spoke': return data.variant
    case 'venn': return data.variant
    case 'chart': return data.chartType
    default: return undefined
  }
}

function convertBlockType(source: BlockData, targetType: BlockType): BlockData {
  if (source.type === targetType) return source

  // Simple conversion with defaults
  switch (targetType) {
    case 'title-body':
      return { type: 'title-body', title: '新标题', body: '正文内容' }
    case 'grid-item':
      return { type: 'grid-item', items: [{ title: '项目一', description: '描述' }, { title: '项目二', description: '描述' }, { title: '项目三', description: '描述' }], variant: 'solid' }
    case 'sequence':
      return { type: 'sequence', steps: [{ label: '步骤一' }, { label: '步骤二' }, { label: '步骤三' }], variant: 'timeline' }
    case 'compare':
      return { type: 'compare', mode: 'versus', sides: [{ name: '方案A', items: [{ label: '特性', value: '值' }] }, { name: '方案B', items: [{ label: '特性', value: '值' }] }] }
    case 'funnel':
      return { type: 'funnel', layers: [{ label: '访问', value: 1000 }, { label: '注册', value: 600 }, { label: '付费', value: 200 }], variant: 'funnel' }
    case 'concentric':
      return { type: 'concentric', rings: [{ label: '核心' }, { label: '中层' }, { label: '外层' }], variant: 'circles' }
    case 'hub-spoke':
      return { type: 'hub-spoke', center: { label: '核心' }, spokes: [{ label: '节点一' }, { label: '节点二' }, { label: '节点三' }], variant: 'orbit' }
    case 'venn':
      return { type: 'venn', sets: [{ label: '集合A' }, { label: '集合B' }], variant: 'classic' }
    case 'chart':
      return { type: 'chart', chartType: 'bar', bars: [{ category: 'Q1', values: [{ name: '值', value: 45 }] }, { category: 'Q2', values: [{ name: '值', value: 62 }] }] }
  }
}

function applyVariant(data: BlockData, value: string): BlockData {
  switch (data.type) {
    case 'grid-item': return { ...data, variant: value as typeof data.variant }
    case 'sequence': return { ...data, variant: value as typeof data.variant }
    case 'compare': return { ...data, mode: value as typeof data.mode }
    case 'funnel': return { ...data, variant: value as typeof data.variant }
    case 'concentric': return { ...data, variant: value as typeof data.variant }
    case 'hub-spoke': return { ...data, variant: value as typeof data.variant }
    case 'venn': return { ...data, variant: value as typeof data.variant }
    case 'chart': return { ...data, chartType: value as typeof data.chartType }
    default: return data
  }
}

export default function BlockLayoutPicker({ data, onChange }: BlockLayoutPickerProps) {
  const handleTypeClick = (targetType: BlockType) => {
    if (targetType === data.type) return
    onChange(convertBlockType(data, targetType))
  }

  const handleVariantClick = (value: string) => {
    onChange(applyVariant(data, value))
  }

  const variantConfig = VARIANT_OPTIONS[data.type]
  const currentVariant = getCurrentVariant(data)

  return (
    <div className="space-y-3">
      {/* Block Type */}
      <div>
        <span className="text-xs font-semibold text-gray-600 uppercase">Block 类型</span>
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {BLOCK_TYPES.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => handleTypeClick(type)}
              className={`px-2 py-0.5 text-xs rounded-full cursor-pointer transition-all ${
                data.type === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Style Variants */}
      {variantConfig && (
        <div>
          <span className="text-xs font-semibold text-gray-600 uppercase">样式变体</span>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {variantConfig.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleVariantClick(opt.value)}
                className={`px-2 py-0.5 text-xs rounded-full cursor-pointer transition-all ${
                  currentVariant === opt.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
