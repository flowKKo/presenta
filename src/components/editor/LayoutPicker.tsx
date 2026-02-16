import type { SlideData } from '../../data/types'
import { convertToType } from '../../data/type-converter'
import { TYPE_LIST, TypeThumbnail, type SlideType } from './TypeThumbnails'
import { VARIANT_OPTIONS } from './variant-config'

interface LayoutPickerProps {
  data: SlideData
  onChange: (data: SlideData) => void
}

function getCurrentVariant(data: SlideData): string | undefined {
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

export default function LayoutPicker({ data, onChange }: LayoutPickerProps) {
  const handleTypeClick = (targetType: SlideType) => {
    if (targetType === data.type) return
    onChange(convertToType(data, targetType))
  }

  const handleVariantClick = (value: string) => {
    onChange(convertToType(data, data.type, value))
  }

  const variantConfig = VARIANT_OPTIONS[data.type]
  const currentVariant = getCurrentVariant(data)

  return (
    <div className="space-y-3">
      {/* A. Layout Types */}
      <div>
        <span className="text-xs font-semibold text-gray-600 uppercase">布局类型</span>
        <div className="grid grid-cols-5 gap-1.5 mt-1.5">
          {TYPE_LIST.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => handleTypeClick(type)}
              className={`flex flex-col items-center p-1 rounded cursor-pointer transition-all ${
                data.type === type
                  ? 'ring-2 ring-blue-400 bg-blue-50'
                  : 'hover:bg-gray-100 bg-gray-50'
              }`}
            >
              <div className="w-full aspect-[16/9]">
                <TypeThumbnail type={type} active={data.type === type} />
              </div>
              <span className="text-[10px] text-gray-600 mt-0.5 leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* B. Style Variants */}
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
