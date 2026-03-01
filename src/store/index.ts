import { createStore } from 'vuex'
import horses, { HorsesState } from './horsesStore'
import race, { RaceState } from './Race'

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
