import { useState, useEffect, useCallback } from 'react'
import SlideDeck from './components/SlideDeck'
import DeckSelector from './components/DeckSelector'
import { decks, deckList } from './data/decks'

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

  return <SlideDeck slides={deck.slides} onBack={handleBack} />
}
