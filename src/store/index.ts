import { createStore } from 'vuex'
import horses, { HorsesState } from './horsesStore.ts'
import race, { RaceState } from './Race.ts'

export interface RootState {
  horses: HorsesState
  race: RaceState
}

export default createStore<RootState>({
  modules: {
    horses,
    race
  }
})
