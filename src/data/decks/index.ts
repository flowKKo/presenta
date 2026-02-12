import type { DeckMeta } from '../types'
import { terminalBenchDeck } from './terminal-bench'
import { aiScaffoldDeck } from './ai-scaffold'

export const decks: Record<string, DeckMeta> = {
  'terminal-bench': terminalBenchDeck,
  'ai-scaffold': aiScaffoldDeck,
}

export const deckList = Object.values(decks)
