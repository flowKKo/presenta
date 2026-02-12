import type { DeckMeta } from '../types'
import { terminalBenchDeck } from './terminal-bench'

export const decks: Record<string, DeckMeta> = {
  'terminal-bench': terminalBenchDeck,
}

export const deckList = Object.values(decks)
