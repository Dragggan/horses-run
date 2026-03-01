import { createStore } from 'vuex'
import horses, { HorsesState } from './horsesStore.js'
import race, { RaceState } from './Race.js'

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
