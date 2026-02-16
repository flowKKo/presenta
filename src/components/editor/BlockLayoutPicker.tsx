import type { BlockData } from '../../data/types'
import { VARIANT_OPTIONS } from './variant-config'

type BlockType = BlockData['type']

export const BLOCK_TYPE_META: Record<BlockType, { icon: string; label: string; color: string }> = {
  'title-body': { icon: 'T', label: '标题文本', color: 'bg-blue-50 text-blue-600' },
  'grid-item': { icon: '⊞', label: '网格', color: 'bg-emerald-50 text-emerald-600' },
  'sequence': { icon: '→', label: '序列', color: 'bg-amber-50 text-amber-600' },
  'compare': { icon: '⇔', label: '对比', color: 'bg-violet-50 text-violet-600' },
  'funnel': { icon: '▽', label: '漏斗', color: 'bg-rose-50 text-rose-600' },
  'concentric': { icon: '◎', label: '同心圆', color: 'bg-cyan-50 text-cyan-600' },
  'hub-spoke': { icon: '✳', label: '轮辐', color: 'bg-orange-50 text-orange-600' },
  'venn': { icon: '◑', label: '韦恩', color: 'bg-indigo-50 text-indigo-600' },
  'cycle': { icon: '⟳', label: '循环', color: 'bg-lime-50 text-lime-600' },
  'table': { icon: '▦', label: '表格', color: 'bg-sky-50 text-sky-600' },
  'roadmap': { icon: '⬥', label: '路线图', color: 'bg-fuchsia-50 text-fuchsia-600' },
  'swot': { icon: '⊞', label: 'SWOT', color: 'bg-red-50 text-red-600' },
  'mindmap': { icon: '🌿', label: '思维导图', color: 'bg-green-50 text-green-600' },
  'stack': { icon: '▤', label: '堆叠', color: 'bg-yellow-50 text-yellow-600' },
  'chart': { icon: '▊', label: '图表', color: 'bg-teal-50 text-teal-600' },
  'image': { icon: '🖼', label: '图片', color: 'bg-pink-50 text-pink-600' },
}

interface BlockLayoutPickerProps {
  data: BlockData
  onChange: (data: BlockData) => void
}

export const BLOCK_TYPES: BlockType[] = [
  'title-body', 'grid-item', 'sequence', 'compare', 'funnel', 'concentric', 'hub-spoke', 'venn', 'cycle', 'table', 'roadmap', 'swot', 'mindmap', 'stack', 'chart', 'image',
]

export { VARIANT_OPTIONS }

export function getCurrentVariant(data: BlockData): string | undefined {
  switch (data.type) {
    case 'grid-item': return data.variant
    case 'sequence': return data.variant
    case 'compare': return data.mode
    case 'funnel': return data.variant
    case 'concentric': return data.variant
    case 'hub-spoke': return data.variant
    case 'venn': return data.variant
    case 'cycle': return data.variant
    case 'table': return data.variant
    case 'roadmap': return data.variant
    case 'swot': return undefined
    case 'mindmap': return undefined
    case 'stack': return data.variant
    case 'chart': return data.chartType
    default: return undefined
  }
}

export function convertBlockType(source: BlockData, targetType: BlockType): BlockData {
  if (source.type === targetType) return source

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
    case 'cycle':
      return { type: 'cycle', steps: [{ label: '计划' }, { label: '执行' }, { label: '检查' }, { label: '改进' }], variant: 'circular' }
    case 'table':
      return { type: 'table', headers: ['项目', '状态', '进度'], rows: [{ cells: ['任务A', '进行中', '60%'] }, { cells: ['任务B', '已完成', '100%'], highlight: true }], variant: 'striped' }
    case 'roadmap':
      return { type: 'roadmap', phases: [{ label: '阶段一', items: [{ label: '任务1', status: 'done' }] }, { label: '阶段二', items: [{ label: '任务2', status: 'active' }] }], variant: 'horizontal' }
    case 'swot':
      return { type: 'swot', strengths: [{ label: '优势1' }], weaknesses: [{ label: '劣势1' }], opportunities: [{ label: '机会1' }], threats: [{ label: '威胁1' }] }
    case 'mindmap':
      return { type: 'mindmap', root: { label: '中心主题', children: [{ label: '分支一', children: [{ label: '子项1' }] }, { label: '分支二' }] } }
    case 'stack':
      return { type: 'stack', layers: [{ label: '层级一', description: '描述' }, { label: '层级二', description: '描述' }, { label: '层级三', description: '描述' }], variant: 'horizontal' }
    case 'chart':
      return { type: 'chart', chartType: 'bar', bars: [{ category: 'Q1', values: [{ name: '值', value: 45 }] }, { category: 'Q2', values: [{ name: '值', value: 62 }] }] }
    case 'image':
      return { type: 'image', placeholder: '图片占位' }
  }
}

export function applyVariant(data: BlockData, value: string): BlockData {
  switch (data.type) {
    case 'grid-item': return { ...data, variant: value as typeof data.variant }
    case 'sequence': return { ...data, variant: value as typeof data.variant }
    case 'compare': return { ...data, mode: value as typeof data.mode }
    case 'funnel': return { ...data, variant: value as typeof data.variant }
    case 'concentric': return { ...data, variant: value as typeof data.variant }
    case 'hub-spoke': return { ...data, variant: value as typeof data.variant }
    case 'venn': return { ...data, variant: value as typeof data.variant }
    case 'cycle': return { ...data, variant: value as typeof data.variant }
    case 'table': return { ...data, variant: value as typeof data.variant }
    case 'roadmap': return { ...data, variant: value as typeof data.variant }
    case 'stack': return { ...data, variant: value as typeof data.variant }
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
      {/* Block Type — 3-col icon grid */}
      <div>
        <span className="text-[11px] font-semibold text-gray-500 tracking-wide uppercase flex items-center gap-2">
          <span>Block 类型</span>
          <span className="flex-1 h-px bg-gray-100" />
        </span>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {BLOCK_TYPES.map((type) => {
            const meta = BLOCK_TYPE_META[type]
            const isActive = data.type === type
            return (
              <button
                key={type}
                onClick={() => handleTypeClick(type)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg border cursor-pointer transition-all ${
                  isActive
                    ? 'ring-2 ring-blue-400 border-blue-200 bg-blue-50'
                    : 'border-gray-100 hover:bg-gray-50 hover:border-gray-200'
                }`}
              >
                <span className={`w-8 h-8 rounded-md flex items-center justify-center text-base ${meta.color}`}>
                  {meta.icon}
                </span>
                <span className={`text-[11px] leading-tight ${isActive ? 'text-blue-700 font-medium' : 'text-gray-500'}`}>
                  {meta.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Style Variants — 3-col button grid */}
      {variantConfig && (
        <div>
          <span className="text-[11px] font-semibold text-gray-500 tracking-wide uppercase flex items-center gap-2">
            <span>样式变体</span>
            <span className="flex-1 h-px bg-gray-100" />
          </span>
          <div className="grid grid-cols-3 gap-1.5 mt-2">
            {variantConfig.options.map((opt) => {
              const isActive = currentVariant === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => handleVariantClick(opt.value)}
                  className={`px-2 py-1.5 text-xs rounded-md border text-center cursor-pointer transition-all ${
                    isActive
                      ? 'bg-blue-500 text-white border-blue-500 font-medium'
                      : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
