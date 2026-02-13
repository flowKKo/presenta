import { createContext, useContext } from 'react'

export interface SpotlightState {
  active: boolean
  revealedCount: number
}

export const SpotlightContext = createContext<SpotlightState>({
  active: false,
  revealedCount: 0,
})

export const SpotlightProvider = SpotlightContext.Provider
export const useSpotlight = () => useContext(SpotlightContext)
