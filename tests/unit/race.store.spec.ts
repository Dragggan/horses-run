import { createStore } from 'vuex'
import race from '@/store/race'

describe('Race Store', () => {
    let store: any

    beforeEach(() => {
        store = createStore({
            modules: {
                race
            }
        })
    })
  it('has correct initial state', () => {
    expect(store.state.race.isRunning).toBe(false)
  })

  it('startRace sets isRunning to true', () => {
    store.commit('race/startRace')
    expect(store.state.race.isRunning).toBe(true)
  })

  it('resetRace sets isRunning to false', () => {
    store.commit('race/startRace')
    store.commit('race/resetRace')
    expect(store.state.race.isRunning).toBe(false)
  })

  it('resetRace works even if already stopped', () => {
    store.commit('race/resetRace')
    expect(store.state.race.isRunning).toBe(false)
  })
})
