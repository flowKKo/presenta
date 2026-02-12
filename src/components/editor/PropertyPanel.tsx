import { useEditor } from './EditorProvider'
import SlideDataEditor from './SlideDataEditor'
import LayoutPicker from './LayoutPicker'
import type { SlideData } from '../../data/types'
import type { TextOverlay, RectOverlay, LineOverlay, OverlayElement } from '../../data/editor-types'

interface PropertyPanelProps {
  originalSlides: SlideData[]
}

function NumberField({ label, value, onChange, min, max, step }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number }) {
  return (
    <label className="block">
      <span className="text-xs text-gray-500">{label}</span>
      <input
        type="number"
        value={Math.round(value * 100) / 100}
        min={min}
        max={max}
        step={step ?? 1}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-2 py-1 text-sm border border-gray-200 rounded mt-0.5"
      />
    </label>
  )
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex items-center gap-2">
      <span className="text-xs text-gray-500 flex-1">{label}</span>
      <input
        type="color"
        value={value || '#000000'}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-6 p-0 border border-gray-200 rounded cursor-pointer"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-24 px-2 py-1 text-xs border border-gray-200 rounded"
      />
    </label>
  )
}

export default function PropertyPanel({ originalSlides }: PropertyPanelProps) {
  const {
    selection,
    getContentBox,
    setContentBox,
    getEffectiveSlideData,
    setSlideDataOverride,
    getOverlays,
    updateOverlay,
    removeOverlay,
  } = useEditor()

  if (!selection) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-gray-400 text-sm text-center">
        点击元素进行编辑
      </div>
    )
  }

  if (selection.type === 'content-box') {
    const { slideIndex } = selection
    const box = getContentBox(slideIndex) ?? { x: 0, y: 0, width: 100, height: 100 }
    const effectiveData = getEffectiveSlideData(slideIndex, originalSlides[slideIndex])

    return (
      <div className="p-4 space-y-6 overflow-y-auto h-full">
        {/* Position/Size */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-600 uppercase">位置 / 尺寸</span>
            <button
              onClick={() => setContentBox(slideIndex, undefined)}
              className="text-xs text-blue-600 hover:underline cursor-pointer"
            >
              重置
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <NumberField label="X (%)" value={box.x} onChange={(v) => setContentBox(slideIndex, { ...box, x: v })} step={0.5} />
            <NumberField label="Y (%)" value={box.y} onChange={(v) => setContentBox(slideIndex, { ...box, y: v })} step={0.5} />
            <NumberField label="宽 (%)" value={box.width} onChange={(v) => setContentBox(slideIndex, { ...box, width: v })} min={10} step={0.5} />
            <NumberField label="高 (%)" value={box.height} onChange={(v) => setContentBox(slideIndex, { ...box, height: v })} min={10} step={0.5} />
          </div>
        </div>

        {/* Layout Picker */}
        <LayoutPicker
          data={effectiveData}
          onChange={(data) => setSlideDataOverride(slideIndex, data)}
        />

        {/* Slide Data Editor */}
        <SlideDataEditor
          data={effectiveData}
          onChange={(data) => setSlideDataOverride(slideIndex, data)}
        />
      </div>
    )
  }

  // Overlay selected
  const { slideIndex, id } = selection
  const overlays = getOverlays(slideIndex)
  const overlay = overlays.find((o) => o.id === id)
  if (!overlay) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-gray-400 text-sm text-center">
        Overlay 未找到
      </div>
    )
  }

  const update = (changes: Partial<OverlayElement>) => updateOverlay(slideIndex, id, changes)

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-600 uppercase">
          {overlay.type === 'text' ? '文本叠加' : overlay.type === 'rect' ? '矩形叠加' : '线条叠加'}
        </span>
        <button
          onClick={() => removeOverlay(slideIndex, id)}
          className="text-xs text-red-500 hover:underline cursor-pointer"
        >
          删除
        </button>
      </div>

      {overlay.type === 'text' && <TextOverlayPanel overlay={overlay} update={update} />}
      {overlay.type === 'rect' && <RectOverlayPanel overlay={overlay} update={update} />}
      {overlay.type === 'line' && <LineOverlayPanel overlay={overlay} update={update} />}
    </div>
  )
}

function TextOverlayPanel({ overlay, update }: { overlay: TextOverlay; update: (c: Partial<TextOverlay>) => void }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <NumberField label="X (%)" value={overlay.x} onChange={(v) => update({ x: v })} step={0.5} />
        <NumberField label="Y (%)" value={overlay.y} onChange={(v) => update({ y: v })} step={0.5} />
        <NumberField label="宽 (%)" value={overlay.width} onChange={(v) => update({ width: v })} min={5} step={0.5} />
        <NumberField label="高 (%)" value={overlay.height} onChange={(v) => update({ height: v })} min={3} step={0.5} />
      </div>
      <label className="block">
        <span className="text-xs text-gray-500">文本</span>
        <textarea
          value={overlay.text}
          onChange={(e) => update({ text: e.target.value })}
          className="w-full px-2 py-1 text-sm border border-gray-200 rounded mt-0.5"
          rows={2}
        />
      </label>
      <NumberField label="字号" value={overlay.fontSize} onChange={(v) => update({ fontSize: v })} min={8} max={200} />
      <ColorField label="颜色" value={overlay.color} onChange={(v) => update({ color: v })} />
      <label className="block">
        <span className="text-xs text-gray-500">字重</span>
        <select
          value={overlay.fontWeight}
          onChange={(e) => update({ fontWeight: Number(e.target.value) as 400 | 600 | 700 })}
          className="w-full px-2 py-1 text-sm border border-gray-200 rounded mt-0.5"
        >
          <option value={400}>Normal (400)</option>
          <option value={600}>Semi-bold (600)</option>
          <option value={700}>Bold (700)</option>
        </select>
      </label>
      <label className="block">
        <span className="text-xs text-gray-500">对齐</span>
        <select
          value={overlay.textAlign}
          onChange={(e) => update({ textAlign: e.target.value as 'left' | 'center' | 'right' })}
          className="w-full px-2 py-1 text-sm border border-gray-200 rounded mt-0.5"
        >
          <option value="left">左对齐</option>
          <option value="center">居中</option>
          <option value="right">右对齐</option>
        </select>
      </label>
    </div>
  )
}

function RectOverlayPanel({ overlay, update }: { overlay: RectOverlay; update: (c: Partial<RectOverlay>) => void }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <NumberField label="X (%)" value={overlay.x} onChange={(v) => update({ x: v })} step={0.5} />
        <NumberField label="Y (%)" value={overlay.y} onChange={(v) => update({ y: v })} step={0.5} />
        <NumberField label="宽 (%)" value={overlay.width} onChange={(v) => update({ width: v })} min={2} step={0.5} />
        <NumberField label="高 (%)" value={overlay.height} onChange={(v) => update({ height: v })} min={2} step={0.5} />
      </div>
      <ColorField label="填充" value={overlay.fill} onChange={(v) => update({ fill: v })} />
      <ColorField label="描边" value={overlay.stroke} onChange={(v) => update({ stroke: v })} />
      <NumberField label="描边宽度" value={overlay.strokeWidth} onChange={(v) => update({ strokeWidth: v })} min={0} max={20} />
      <NumberField label="圆角" value={overlay.borderRadius} onChange={(v) => update({ borderRadius: v })} min={0} max={50} />
    </div>
  )
}

function LineOverlayPanel({ overlay, update }: { overlay: LineOverlay; update: (c: Partial<LineOverlay>) => void }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <NumberField label="X1 (%)" value={overlay.x1} onChange={(v) => update({ x1: v })} step={0.5} />
        <NumberField label="Y1 (%)" value={overlay.y1} onChange={(v) => update({ y1: v })} step={0.5} />
        <NumberField label="X2 (%)" value={overlay.x2} onChange={(v) => update({ x2: v })} step={0.5} />
        <NumberField label="Y2 (%)" value={overlay.y2} onChange={(v) => update({ y2: v })} step={0.5} />
      </div>
      <ColorField label="描边" value={overlay.stroke} onChange={(v) => update({ stroke: v })} />
      <NumberField label="描边宽度" value={overlay.strokeWidth} onChange={(v) => update({ strokeWidth: v })} min={1} max={20} />
    </div>
  )
}
