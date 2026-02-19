import type { SlideData, BlockSlideData, ContentBlock, BlockData } from './types'

let blockIdCounter = 0
function nextBlockId(): string {
  return `blk-${Date.now()}-${++blockIdCounter}`
}

/**
 * Convert a legacy slide type into a BlockSlideData with title-body + diagram blocks.
 * Used for runtime conversion when editing old slides.
 */
export function legacyToBlocks(data: SlideData): BlockSlideData {
  if (data.type === 'block-slide') return data

  const blocks: ContentBlock[] = []

  // Title/body block at top
  const title = data.title
  const body = 'body' in data ? (data as { body?: string }).body : undefined
  const subtitle = 'subtitle' in data ? (data as { subtitle?: string }).subtitle : undefined

  // Diagram block (if any)
  const diagramData = extractDiagramData(data)

  if (diagramData) {
    // Title/body at the top, diagram below
    blocks.push({
      id: nextBlockId(),
      x: 0,
      y: 0,
      width: 100,
      height: 18,
      data: { type: 'title-body', title, body: body ?? subtitle },
    })
    blocks.push({
      id: nextBlockId(),
      x: 0,
      y: 20,
      width: 100,
      height: 80,
      data: diagramData,
    })
  } else {
    // Title-only slide: full area
    blocks.push({
      id: nextBlockId(),
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      data: { type: 'title-body', title, body: body ?? subtitle },
    })
  }

  return {
    type: 'block-slide',
    title,
    blocks,
  }
}

/** Pick optional color fields from source slide data */
function pickColors(data: { textColor?: string; colorPalette?: string }): { textColor?: string; colorPalette?: string } {
  const result: { textColor?: string; colorPalette?: string } = {}
  if (data.textColor) result.textColor = data.textColor
  if (data.colorPalette) result.colorPalette = data.colorPalette
  return result
}

function extractDiagramData(data: SlideData): BlockData | null {
  switch (data.type) {
    case 'title':
    case 'key-point':
      return null

    case 'grid-item':
      return { type: 'grid-item', items: data.items, variant: data.variant, columns: data.columns, gap: data.gap, ...pickColors(data) }

    case 'sequence':
      return { type: 'sequence', steps: data.steps, variant: data.variant, direction: data.direction, gap: data.gap, ...pickColors(data) }

    case 'compare':
      return {
        type: 'compare', mode: data.mode,
        sides: data.sides, quadrantItems: data.quadrantItems,
        xAxis: data.xAxis, yAxis: data.yAxis,
        visible: data.visible, hidden: data.hidden,
        ...pickColors(data),
      }

    case 'funnel':
      return { type: 'funnel', layers: data.layers, variant: data.variant, ...pickColors(data) }

    case 'concentric':
      return { type: 'concentric', rings: data.rings, variant: data.variant, ...pickColors(data) }

    case 'hub-spoke':
      return { type: 'hub-spoke', center: data.center, spokes: data.spokes, variant: data.variant, ...pickColors(data) }

    case 'venn':
      return { type: 'venn', sets: data.sets, variant: data.variant, intersectionLabel: data.intersectionLabel, ...pickColors(data) }

    case 'cycle':
      return { type: 'cycle', steps: data.steps, variant: data.variant, ...pickColors(data) }

    case 'table':
      return { type: 'table', headers: data.headers, rows: data.rows, variant: data.variant, ...pickColors(data) }

    case 'roadmap':
      return { type: 'roadmap', phases: data.phases, variant: data.variant, ...pickColors(data) }

    case 'swot':
      return { type: 'swot', strengths: data.strengths, weaknesses: data.weaknesses, opportunities: data.opportunities, threats: data.threats, ...pickColors(data) }

    case 'mindmap':
      return { type: 'mindmap', root: data.root, ...pickColors(data) }

    case 'stack':
      return { type: 'stack', layers: data.layers, variant: data.variant, ...pickColors(data) }

    case 'chart': {
      const { type, title, body, titleSize, bodySize, titleColor, chartHeight, ...chartData } = data
      return { type: 'chart' as const, ...chartData }
    }

    case 'block-slide':
      return null
  }
}
