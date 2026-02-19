import { useCallback } from 'react'
import type { BlockSlideData, ContentBlock } from '../../data/types'
import { useEditor } from '../editor/EditorProvider'
import { useSpotlight } from '../../hooks/useSpotlight'
import BlockRenderer from './BlockRenderer'
import BlockWrapper from './BlockWrapper'

interface BlockSlideRendererProps {
  data: BlockSlideData
  slideIndex: number
}

export default function BlockSlideRenderer({ data, slideIndex }: BlockSlideRendererProps) {
  const {
    editMode,
    selection,
    setSelection,
  } = useEditor()
  const { active: spotlightActive, revealedCount } = useSpotlight()

  // Click on empty canvas area → select the slide (shows add-block panel)
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!editMode) return
    // Only fire when clicking directly on the canvas, not on a block
    if (e.target === e.currentTarget) {
      setSelection({ type: 'content-box', slideIndex })
    }
  }

  return (
    <div
      className="relative w-full h-full"
      onClick={handleCanvasClick}
    >
      {data.blocks.map((block, blockIndex) => {
        const isSelected =
          selection?.type === 'block' &&
          selection.slideIndex === slideIndex &&
          selection.blockId === block.id

        const isRevealed = !spotlightActive || blockIndex < revealedCount

        return (
          <BlockItem
            key={block.id}
            block={block}
            slideIndex={slideIndex}
            isSelected={isSelected}
            editMode={editMode}
            spotlightRevealed={isRevealed}
          />
        )
      })}
    </div>
  )
}

/**
 * BlockItem creates stable callbacks via useCallback so that the
 * memoized BlockWrapper only re-renders when its relevant props change.
 */
function BlockItem({ block, slideIndex, isSelected, editMode, spotlightRevealed }: {
  block: ContentBlock
  slideIndex: number
  isSelected: boolean
  editMode: boolean
  spotlightRevealed: boolean
}) {
  const { setSelection, updateBlock, updateBlockQuiet, beginDrag, openBlockContextMenu } = useEditor()

  const onSelect = useCallback(() => {
    setSelection({ type: 'block', slideIndex, blockId: block.id })
  }, [setSelection, slideIndex, block.id])

  const onUpdate = useCallback((bounds: { x: number; y: number; width: number; height: number }) => {
    updateBlock(slideIndex, block.id, bounds)
  }, [updateBlock, slideIndex, block.id])

  const onUpdateQuiet = useCallback((bounds: { x: number; y: number; width: number; height: number }) => {
    updateBlockQuiet(slideIndex, block.id, bounds)
  }, [updateBlockQuiet, slideIndex, block.id])

  const onContextMenu = useCallback((e: React.MouseEvent) => {
    openBlockContextMenu(e.clientX, e.clientY, slideIndex, block.id)
  }, [openBlockContextMenu, slideIndex, block.id])

  return (
    <BlockWrapper
      block={block}
      isSelected={isSelected}
      editMode={editMode}
      onSelect={onSelect}
      onUpdate={onUpdate}
      onUpdateQuiet={onUpdateQuiet}
      onDragStart={beginDrag}
      onContextMenu={onContextMenu}
      spotlightRevealed={spotlightRevealed}
    >
      <BlockRenderer data={block.data} blockId={block.id} slideIndex={slideIndex} />
    </BlockWrapper>
  )
}
