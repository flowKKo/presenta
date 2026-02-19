import { useRef, useCallback, useState, useEffect, lazy, Suspense } from 'react'
import { colors } from '../theme/swiss'
import type { SlideData } from '../data/types'
import Slide from './Slide'
import SlideContent from './SlideContent'
import Sidebar from './Sidebar'
import { useFullscreen } from '../hooks/useFullscreen'
import { EditorProvider, useEditor } from './editor/EditorProvider'
import { InlineEditProvider } from './editor/InlineEditContext'
import EditorToolbar from './editor/EditorToolbar'
import BlockContextMenu from './editor/BlockContextMenu'
import { exportDeck } from '../data/deck-io'

const FullscreenOverlay = lazy(() => import('./FullscreenOverlay'))
const PropertyPanel = lazy(() => import('./editor/PropertyPanel'))

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group/tip">
      {children}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 rounded-md bg-gray-800 text-white text-[11px] whitespace-nowrap opacity-0 group-hover/tip:opacity-100 pointer-events-none transition-opacity z-50">
        {label}
      </div>
    </div>
  )
}

interface SlideDeckProps {
  slides: SlideData[]
  onBack?: () => void
  deckId: string
  deckTitle?: string
  deckDescription?: string
}

export default function SlideDeck({ slides, onBack, deckId, deckTitle, deckDescription }: SlideDeckProps) {
  return (
    <EditorProvider deckId={deckId} originalSlides={slides} deckTitle={deckTitle} deckDescription={deckDescription}>
      <SlideDeckInner slides={slides} onBack={onBack} />
    </EditorProvider>
  )
}

function SlideDeckInner({ slides, onBack }: Omit<SlideDeckProps, 'deckId' | 'deckTitle' | 'deckDescription'>) {
  const mainRef = useRef<HTMLDivElement>(null)
  const {
    editMode, toggleEditMode, setSelection,
    allSlides, effectiveSlides, slideEntries, insertSlide, deleteSlide, copySlide, pasteSlide, duplicateSlide, moveSlide, clipboard,
    setPendingTemplate, pendingTemplateSlideIndex,
    deckTitle, deckDescription, setDeckTitle, setDeckDescription,
  } = useEditor()

  const [spotlight, setSpotlight] = useState(false)
  const [showToolbar, setShowToolbar] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [sidebarWidth, setSidebarWidth] = useState(260)
  const goNextRef = useRef(() => {})
  const goPrevRef = useRef(() => {})
  const fullscreen = useFullscreen(allSlides.length)

  // ─── Navigation helpers ───

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const goNext = useCallback(() => {
    setActiveIndex(prev => Math.min(prev + 1, allSlides.length - 1))
  }, [allSlides.length])

  const goPrev = useCallback(() => {
    setActiveIndex(prev => Math.max(prev - 1, 0))
  }, [])

  // Sync selection when activeIndex changes in edit mode
  useEffect(() => {
    if (editMode) {
      setSelection({ type: 'content-box', slideIndex: activeIndex })
    }
  }, [activeIndex, editMode, setSelection])

  // Keep refs in sync so wheel handler never has stale closures
  goNextRef.current = goNext
  goPrevRef.current = goPrev

  // ─── Wheel navigation with accumulated delta ───

  useEffect(() => {
    const el = mainRef.current
    if (!el) return
    let accDelta = 0
    let cooldown = false
    let resetTimer: ReturnType<typeof setTimeout>
    let cooldownTimer: ReturnType<typeof setTimeout>
    const THRESHOLD = 4

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (cooldown) return

      accDelta += e.deltaY
      clearTimeout(resetTimer)
      resetTimer = setTimeout(() => { accDelta = 0 }, 120)

      if (accDelta > THRESHOLD) {
        goNextRef.current()
        accDelta = 0
        cooldown = true
        cooldownTimer = setTimeout(() => { cooldown = false }, 250)
      } else if (accDelta < -THRESHOLD) {
        goPrevRef.current()
        accDelta = 0
        cooldown = true
        cooldownTimer = setTimeout(() => { cooldown = false }, 250)
      }
    }
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => { el.removeEventListener('wheel', handleWheel); clearTimeout(resetTimer); clearTimeout(cooldownTimer) }
  }, [])  // stable — reads from refs

  // ─── Keyboard navigation (uses refs to avoid re-attaching on slide count changes) ───

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
      const editable = (e.target as HTMLElement)?.isContentEditable
      if (tag === 'input' || tag === 'textarea' || editable) return

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault()
          goNextRef.current()
          break
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          goPrevRef.current()
          break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])  // stable — reads from refs

  // ─── Bounds protection ───

  useEffect(() => {
    if (activeIndex >= allSlides.length) {
      setActiveIndex(Math.max(0, allSlides.length - 1))
    }
  }, [activeIndex, allSlides.length])

  // ─── Insert blank slide ───

  const handleInsertBlankSlide = useCallback((position: number) => {
    const blank: SlideData = { type: 'key-point', title: '新页面', body: '' }
    insertSlide(position, blank)
    if (!editMode) toggleEditMode()
    setPendingTemplate(position)
  }, [insertSlide, editMode, toggleEditMode, setPendingTemplate])

  // Navigate to newly created slide when pendingTemplateSlideIndex is set
  useEffect(() => {
    if (pendingTemplateSlideIndex === null) return
    requestAnimationFrame(() => {
      setActiveIndex(pendingTemplateSlideIndex)
      setSelection({ type: 'content-box', slideIndex: pendingTemplateSlideIndex })
    })
  }, [pendingTemplateSlideIndex, setSelection])

  // ─── Export ───

  const handleExport = useCallback(() => {
    exportDeck(deckTitle || '未命名', deckDescription, effectiveSlides)
  }, [deckTitle, deckDescription, effectiveSlides])

  // ─── Fullscreen ───

  const handleEnterFullscreen = useCallback(() => {
    if (editMode) toggleEditMode()
    fullscreen.enter(activeIndex)
  }, [fullscreen, activeIndex, editMode, toggleEditMode])

  const editModeRef = useRef(editMode)
  editModeRef.current = editMode
  const handleExitFullscreen = useCallback(() => {
    const idx = fullscreen.currentIndex
    fullscreen.exit()
    requestAnimationFrame(() => {
      if (!editModeRef.current) toggleEditMode()
    })
    if (idx !== null) {
      setActiveIndex(idx)
    }
  }, [fullscreen, toggleEditMode])

  // ─── Delete slide wrapper — adjust activeIndex ───

  const handleDeleteSlide = useCallback((position: number) => {
    deleteSlide(position)
    setActiveIndex((prev) => {
      if (prev > position) return prev - 1
      if (prev === position && prev >= allSlides.length - 1) return Math.max(0, prev - 1)
      return prev
    })
  }, [deleteSlide, allSlides.length])

  // ─── Reorder slide wrapper — track activeIndex ───

  const handleReorderSlide = useCallback((fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return
    moveSlide(fromIndex, toIndex)
    // Update activeIndex to follow the moved slide if it was active
    setActiveIndex((prev) => {
      if (prev === fromIndex) return toIndex
      if (fromIndex < prev && toIndex >= prev) return prev - 1
      if (fromIndex > prev && toIndex <= prev) return prev + 1
      return prev
    })
  }, [moveSlide])

  const currentSlide = allSlides[activeIndex]
  const currentEffective = effectiveSlides[activeIndex]

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: colors.page }}>
      {/* Sidebar */}
      <Sidebar
        slides={effectiveSlides}
        slideEntries={slideEntries}
        activeIndex={activeIndex}
        onClickSlide={goToSlide}
        editMode={editMode}
        onInsertBlankSlide={handleInsertBlankSlide}
        onDeleteSlide={handleDeleteSlide}
        onCopySlide={copySlide}
        onPasteSlide={pasteSlide}
        onDuplicateSlide={duplicateSlide}
        onReorderSlide={handleReorderSlide}
        hasClipboard={clipboard !== null}
        width={sidebarWidth}
        onResize={setSidebarWidth}
      />

      {/* Main area: top bar + slide view */}
      <div
        className="flex-1 flex flex-col transition-all overflow-hidden h-screen sidebar-margin"
        style={{ '--sidebar-w': `${sidebarWidth}px` } as React.CSSProperties}
      >
        {/* Top breadcrumb bar */}
        <div
          className="shrink-0 flex items-center px-3 border-b"
          style={{ background: colors.card, borderColor: colors.border }}
        >
          {/* Back button */}
          {onBack && (
            <button
              onClick={onBack}
              className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-colors hover:bg-black/5 shrink-0 mr-1"
              style={{ color: colors.textSecondary }}
              title="返回"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2L4 8l6 6" />
              </svg>
            </button>
          )}

          {/* Title + Description */}
          <div className="flex-1 min-w-0 py-2">
            <input
              className="text-sm font-semibold bg-transparent border-none outline-none w-full rounded px-1.5 py-0.5 -mx-1.5 hover:bg-black/5 focus:bg-black/5 transition-colors"
              style={{ color: colors.textPrimary }}
              value={deckTitle ?? ''}
              placeholder="未命名文档"
              onChange={(e) => setDeckTitle(e.target.value)}
            />
            <input
              className="text-[11px] bg-transparent border-none outline-none w-full rounded px-1.5 py-0.5 -mx-1.5 hover:bg-black/5 focus:bg-black/5 transition-colors"
              style={{ color: colors.textCaption }}
              value={deckDescription ?? ''}
              placeholder="添加描述..."
              onChange={(e) => setDeckDescription(e.target.value)}
            />
          </div>

          {/* Action buttons — right side */}
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <Tooltip label="导出文档">
              <button
                onClick={handleExport}
                className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-colors hover:bg-black/5"
                style={{ color: colors.textSecondary }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
            </Tooltip>
            <Tooltip label={editMode ? '退出编辑' : '编辑模式'}>
              <button
                onClick={toggleEditMode}
                className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-colors hover:bg-black/5"
                style={{
                  color: editMode ? '#1565C0' : colors.textSecondary,
                  background: editMode ? '#E3F2FD' : undefined,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" />
                </svg>
              </button>
            </Tooltip>
            {editMode && (
              <Tooltip label={showToolbar ? '隐藏绘图工具' : '显示绘图工具'}>
                <button
                  onClick={() => setShowToolbar((s) => !s)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-colors hover:bg-black/5"
                  style={{
                    color: showToolbar ? '#1565C0' : colors.textSecondary,
                    background: showToolbar ? '#E3F2FD' : undefined,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="10" height="10" rx="2" />
                    <circle cx="16.5" cy="16.5" r="5" />
                  </svg>
                </button>
              </Tooltip>
            )}
            <Tooltip label={spotlight ? '关闭聚光灯' : '聚光灯'}>
              <button
                onClick={() => setSpotlight((s) => !s)}
                className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-colors hover:bg-black/5"
                style={{
                  color: spotlight ? '#1565C0' : colors.textSecondary,
                  background: spotlight ? '#E3F2FD' : undefined,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              </button>
            </Tooltip>
            <Tooltip label="全屏预览">
              <button
                onClick={handleEnterFullscreen}
                className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-colors hover:bg-black/5"
                style={{ color: colors.textSecondary }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" />
                </svg>
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Slide view */}
        <div
          ref={mainRef}
          className="flex-1 flex items-center justify-center relative overflow-hidden"
          onClick={(e) => {
            if (!editMode) return
            if (e.target === e.currentTarget) setSelection({ type: 'content-box', slideIndex: activeIndex })
          }}
        >
          {currentSlide && currentEffective && (
            <Slide
              number={activeIndex + 1}
              slideIndex={activeIndex}
              slideData={currentEffective}
            >
              <InlineEditProvider slideIndex={activeIndex} originalData={currentSlide}>
                <SlideContent data={currentEffective} slideIndex={activeIndex} />
              </InlineEditProvider>
            </Slide>
          )}

          {/* Page indicator */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium select-none"
            style={{
              color: colors.textCaption,
              background: 'rgba(0,0,0,0.05)',
            }}
          >
            {activeIndex + 1} / {allSlides.length}
          </div>
        </div>
      </div>

      {/* Editor toolbar */}
      {editMode && showToolbar && <EditorToolbar onClose={() => setShowToolbar(false)} />}
      {editMode && <BlockContextMenu />}

      {/* Property panel — flex child, always gets full 480px */}
      {editMode && (
        <div
          className="w-[480px] shrink-0 h-screen border-l overflow-hidden flex flex-col"
          style={{ background: colors.card, borderColor: colors.border }}
        >
          <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: colors.border }}>
            <span className="text-sm font-semibold" style={{ color: colors.textPrimary }}>属性面板</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Suspense fallback={null}>
              <PropertyPanel originalSlides={allSlides} />
            </Suspense>
          </div>
        </div>
      )}

      {/* Fullscreen overlay (lazy-loaded) */}
      {fullscreen.isActive && fullscreen.currentIndex !== null && (
        <Suspense fallback={null}>
          <FullscreenOverlay
            slides={effectiveSlides}
            currentIndex={fullscreen.currentIndex}
            onNext={fullscreen.next}
            onPrev={fullscreen.prev}
            onExit={handleExitFullscreen}
            spotlight={spotlight}
          />
        </Suspense>
      )}
    </div>
  )
}
