import type { DeckExportPayload, DeckMeta, SlideData } from './types'

/** Required fields per slide type — checks array/object/string presence to prevent runtime crashes */
const REQUIRED_FIELDS: Record<string, { arrays?: string[]; objects?: string[]; strings?: string[] }> = {
  'title':      { strings: ['title'] },
  'key-point':  { strings: ['title'] },
  'chart':      { strings: ['title', 'chartType'] },
  'grid-item':  { strings: ['title', 'variant'], arrays: ['items'] },
  'sequence':   { strings: ['title', 'variant'], arrays: ['steps'] },
  'compare':    { strings: ['title', 'mode'] },
  'funnel':     { strings: ['title', 'variant'], arrays: ['layers'] },
  'concentric': { strings: ['title', 'variant'], arrays: ['rings'] },
  'hub-spoke':  { strings: ['title', 'variant'], arrays: ['spokes'], objects: ['center'] },
  'venn':       { strings: ['title', 'variant'], arrays: ['sets'] },
  'cycle':      { strings: ['title', 'variant'], arrays: ['steps'] },
  'table':      { strings: ['title', 'variant'], arrays: ['headers', 'rows'] },
  'roadmap':    { strings: ['title', 'variant'], arrays: ['phases'] },
  'swot':       { strings: ['title'], arrays: ['strengths', 'weaknesses', 'opportunities', 'threats'] },
  'mindmap':    { strings: ['title'], objects: ['root'] },
  'stack':      { strings: ['title', 'variant'], arrays: ['layers'] },
  'block-slide': { strings: ['title'], arrays: ['blocks'] },
}

function validateSlide(slide: Record<string, unknown>): boolean {
  const type = slide.type as string
  const req = REQUIRED_FIELDS[type]
  if (!req) return false
  for (const f of req.strings ?? []) {
    if (typeof slide[f] !== 'string') return false
  }
  for (const f of req.arrays ?? []) {
    if (!Array.isArray(slide[f])) return false
    // Validate array elements are non-null objects (or strings for headers)
    const arr = slide[f] as unknown[]
    for (const el of arr) {
      if (el == null) return false
      if (typeof el !== 'object' && typeof el !== 'string') return false
    }
  }
  for (const f of req.objects ?? []) {
    if (typeof slide[f] !== 'object' || slide[f] === null || Array.isArray(slide[f])) return false
  }
  return true
}

export function exportDeck(title: string, description: string | undefined, slides: SlideData[]) {
  const payload: DeckExportPayload = {
    version: 1,
    title,
    description,
    slides,
  }
  const json = JSON.stringify(payload, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${title || 'untitled'}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export async function importDeckFromFile(file: File): Promise<DeckMeta> {
  let raw: string
  try {
    raw = await file.text()
  } catch {
    throw new Error('文件读取失败')
  }

  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    throw new Error('文件格式错误：无法解析 JSON')
  }

  const obj = data as Record<string, unknown>

  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    throw new Error('文件内容无效：缺少必要字段或幻灯片格式不正确')
  }
  if (obj.version !== 1) {
    throw new Error('文件内容无效：不支持的版本号')
  }
  if (typeof obj.title !== 'string' || !obj.title) {
    throw new Error('文件内容无效：缺少必要字段或幻灯片格式不正确')
  }
  if (!Array.isArray(obj.slides) || obj.slides.length === 0) {
    throw new Error('文件内容无效：缺少必要字段或幻灯片格式不正确')
  }

  for (let i = 0; i < (obj.slides as unknown[]).length; i++) {
    const slide = (obj.slides as unknown[])[i]
    if (typeof slide !== 'object' || slide === null || Array.isArray(slide)) {
      throw new Error(`幻灯片 #${i + 1} 格式无效`)
    }
    const s = slide as Record<string, unknown>
    if (!validateSlide(s)) {
      throw new Error(`幻灯片 #${i + 1} (${String(s.type ?? '未知类型')}) 缺少必要字段`)
    }
  }

  const now = new Date()
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  return {
    id: `deck-${Date.now()}`,
    title: obj.title as string,
    description: typeof obj.description === 'string' ? obj.description : undefined,
    date,
    slides: obj.slides as SlideData[],
  }
}
