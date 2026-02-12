import { colors } from '../../theme/swiss'
import type { SlideData } from '../../data/types'
import { createDefaultSlide } from '../../data/type-converter'
import { TYPE_LIST } from './TypeThumbnails'

interface AddSlidePanelProps {
  onAdd: (data: SlideData) => void
}

function BlockSlideThumb() {
  const c = '#4CAF50'
  return (
    <svg viewBox="0 0 80 45" className="w-full h-full">
      <rect x="8" y="4" width="30" height="12" rx="2" fill={c} opacity={0.3} stroke={c} strokeWidth="1" />
      <rect x="42" y="4" width="30" height="12" rx="2" fill={c} opacity={0.3} stroke={c} strokeWidth="1" />
      <rect x="8" y="20" width="64" height="20" rx="2" fill={c} opacity={0.2} stroke={c} strokeWidth="1" strokeDasharray="3 2" />
      <text x="40" y="33" textAnchor="middle" fontSize="8" fill={c} fontWeight="600">+</text>
    </svg>
  )
}

export default function AddSlidePanel({ onAdd }: AddSlidePanelProps) {
  return (
    <div className="grid grid-cols-5 gap-2 p-3">
      {/* Block slide - first option */}
      <button
        onClick={() => onAdd(createDefaultSlide('block-slide'))}
        className="flex flex-col items-center gap-1 p-1.5 rounded-md cursor-pointer transition-colors hover:bg-black/5"
      >
        <div
          className="w-full aspect-video rounded border overflow-hidden"
          style={{ borderColor: '#4CAF50', background: colors.slide }}
        >
          <BlockSlideThumb />
        </div>
        <span className="text-[10px] leading-tight font-semibold" style={{ color: '#4CAF50' }}>
          自由布局
        </span>
      </button>

      {/* Legacy slide types */}
      {TYPE_LIST.map(({ type, label, Thumb }) => (
        <button
          key={type}
          onClick={() => onAdd(createDefaultSlide(type))}
          className="flex flex-col items-center gap-1 p-1.5 rounded-md cursor-pointer transition-colors hover:bg-black/5"
        >
          <div
            className="w-full aspect-video rounded border overflow-hidden"
            style={{ borderColor: colors.border, background: colors.slide }}
          >
            <Thumb />
          </div>
          <span className="text-[10px] leading-tight" style={{ color: colors.textSecondary }}>
            {label}
          </span>
        </button>
      ))}
    </div>
  )
}
