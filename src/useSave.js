import { useSyncExternalStore } from 'react'
import { E, subscribe, getVersion } from './store'

// Re-renders the calling component whenever the save changes; returns the live save.
export function useSave() {
  useSyncExternalStore(subscribe, getVersion)
  return E.SV
}
