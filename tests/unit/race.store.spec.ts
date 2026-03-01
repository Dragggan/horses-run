import { createStore } from 'vuex'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import race from '@/store/race'
import { runRaceRound } from '@/services/raceEngine'

vi.mock('@/services/raceEngine', () => ({
    runRaceRound: vi.fn()
}))

describe('Race Store', () => {
    let store: any

    beforeEach(() => {
        vi.useFakeTimers()

        store = createStore({
            modules: {
                race
            }
        })

        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('has correct initial state', () => {
        expect(store.state.race.isRunning).toBe(false)
        expect(store.state.race.activeRound).toBe(null)
        expect(store.state.race.results).toEqual([])
        expect(store.state.race.schedule).toEqual([])
    })

    it('does nothing if schedule is empty', async () => {
        store.state.race.schedule = []

        await store.dispatch('race/startRace')

        expect(store.state.race.raceInProgress).toBe(false)
        expect(store.state.race.results.length).toBe(0)
    })

    it('runs through schedule and resets state', async () => {
        ; (runRaceRound as any).mockResolvedValue({
            round: 1,
            winner: { id: 1, name: 'A', speed: 2 }
        })

        store.state.race.schedule = [
            {
                round: 1,
                distance: 1200,
                horses: [
                    { id: 1, name: 'A', speed: 2 },
                    { id: 2, name: 'B', speed: 3 }
                ]
            }
        ]

        const dispatchPromise = store.dispatch('race/startRace')

        await vi.runAllTimersAsync()

        await dispatchPromise

        expect(runRaceRound).toHaveBeenCalledTimes(1)
        expect(store.state.race.results.length).toBe(1)
        expect(store.state.race.activeRound).toBe(null)
        expect(store.state.race.isRunning).toBe(false)
        expect(store.state.race.raceInProgress).toBe(false)
    })

    it('SET_RUNNING mutation updates state', () => {
        store.commit('race/SET_RUNNING', true)
        expect(store.state.race.isRunning).toBe(true)

        store.commit('race/SET_RUNNING', false)
        expect(store.state.race.isRunning).toBe(false)
    })

    it('RESET mutation clears state', () => {
        store.state.race.schedule = [{}]
        store.state.race.results = [{}]
        store.state.race.activeRound = { round: 1 }
        store.state.race.isRunning = true

        store.commit('race/RESET')

        expect(store.state.race.schedule).toEqual([])
        expect(store.state.race.results).toEqual([])
        expect(store.state.race.activeRound).toBe(null)
        expect(store.state.race.isRunning).toBe(false)
    },
    )
    it('generateSchedule creates 6 rounds with 10 horses each', async () => {
        const mockHorses = Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            name: `Horse ${i + 1}`,
            speed: 3
        }))

        store = createStore({
            modules: {
                race,
                horses: {
                    namespaced: true,
                    state: {
                        all: mockHorses
                    },
                    getters: {
                        allHorses: (state: any) => state.all
                    }
                }
            }
        })

        await store.dispatch('race/generateSchedule')

        const schedule = store.state.race.schedule

        expect(schedule.length).toBe(6)

        schedule.forEach((round: any, index: number) => {
            expect(round.round).toBe(index + 1)
            expect(round.horses.length).toBe(10)
        })
    })
})
