import type { DeckMeta } from '../types'
import { engineDemoDeck } from './engine-demo'

export const decks: Record<string, DeckMeta> = {
  'engine-demo': engineDemoDeck,
}

export const deckList = Object.values(decks)
