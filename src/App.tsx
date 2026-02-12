import { useState, useEffect, useCallback } from 'react'
import SlideDeck from './components/SlideDeck'
import DeckSelector from './components/DeckSelector'
import Slide from './components/Slide'
import { decks, deckList } from './data/decks'
import type { SlideData } from './data/types'

import TitleSlide from './components/slides/TitleSlide'
import KeyPointSlide from './components/slides/KeyPointSlide'
import ChartSlide from './components/slides/ChartSlide'
import GridItemEngine from './components/engines/GridItemEngine'
import SequenceEngine from './components/engines/SequenceEngine'
import CompareEngine from './components/engines/CompareEngine'
import FunnelPyramidEngine from './components/engines/FunnelPyramidEngine'
import ConcentricEngine from './components/engines/ConcentricEngine'
import HubSpokeEngine from './components/engines/HubSpokeEngine'
import VennEngine from './components/engines/VennEngine'

function SlideContent({ data }: { data: SlideData }) {
  switch (data.type) {
    case 'title': return <TitleSlide {...data} />
    case 'key-point': return <KeyPointSlide {...data} />
    case 'chart': return <ChartSlide {...data} />
    case 'grid-item': return <GridItemEngine {...data} />
    case 'sequence': return <SequenceEngine {...data} />
    case 'compare': return <CompareEngine {...data} />
    case 'funnel': return <FunnelPyramidEngine {...data} />
    case 'concentric': return <ConcentricEngine {...data} />
    case 'hub-spoke': return <HubSpokeEngine {...data} />
    case 'venn': return <VennEngine {...data} />
  }
}

function getHashDeckId(): string | null {
  const hash = window.location.hash.slice(1)
  return hash || null
}

export default function App() {
  const [deckId, setDeckId] = useState<string | null>(getHashDeckId)

  const onHashChange = useCallback(() => {
    setDeckId(getHashDeckId())
  }, [])

  useEffect(() => {
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [onHashChange])

  const handleBack = useCallback(() => {
    window.location.hash = ''
  }, [])

  if (!deckId) {
    return <DeckSelector decks={deckList} />
  }

  const deck = decks[deckId]
  if (!deck) {
    return <DeckSelector decks={deckList} />
  }

  return (
    <SlideDeck onBack={handleBack}>
      {deck.slides.map((slide, i) => (
        <Slide key={i} number={i + 1}>
          <SlideContent data={slide} />
        </Slide>
      ))}
    </SlideDeck>
  )
}
