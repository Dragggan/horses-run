import { Module } from 'vuex'
import { Round, RoundResult } from '@/types'
import { runRaceRound } from '../services/raceEngine'
import { RootState } from '@/state'

const ROUND_DISTANCES = [1200, 1400]

export interface RaceState {
    schedule: Round[]
    results: RoundResult[]
    activeRound: Round | null
    isRunning: boolean
}

const race: Module<RaceState, RootState> = {
    namespaced: true,

    state: (): RaceState => ({
        schedule: [],
        results: [],
        activeRound: null,
        isRunning: false,
    }),

    mutations: {
        SET_SCHEDULE(state, schedule: Round[]) {
            state.schedule = schedule
        },
        SET_RUNNING(state, value: boolean) {
            state.isRunning = value
        },
        SET_ACTIVE_ROUND(state, round: Round | null) {
            state.activeRound = round
        },
        ADD_RESULT(state, result: RoundResult) {
            state.results.push(result)
            console.log('%c  -> ', 'color:red;', state.results);
        },
        RESET(state) {
            state.schedule = []
            state.results = []
            state.activeRound = null
            state.isRunning = false
        }
    },

    actions: {
        generateSchedule({ commit, rootGetters }) {
            const horses = rootGetters['horses/allHorses']

            const schedule: Round[] = ROUND_DISTANCES.map((distance, index) => ({
                round: index + 1,
                distance,
                horses: shuffle(horses).slice(0, 10)
            }))

            commit('SET_SCHEDULE', schedule)
        },

        async startRace({ state, commit }) {
            console.log('%c  state.schedule.length-> ', 'color:red;', state.schedule.length);
            if (!state.schedule.length) return

            commit('SET_RUNNING', true)

            for (const round of state.schedule) {
                commit('SET_ACTIVE_ROUND', round)
                const result = await runRaceRound(round)
                commit('ADD_RESULT', result)

                await delay(1000)
            }

            commit('SET_ACTIVE_ROUND', null)
            commit('SET_RUNNING', false)
        }
    },
    getters: {
        isRunning: state => state.isRunning
    }
}

function shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5)
}

function delay(ms: number): Promise<void> {
    console.log('%c  ms-> ', 'color:red;', ms);
    return new Promise(resolve => {
        console.log('%c  res-> ', 'color:red;', resolve);
        setTimeout(resolve, ms)
    })
}

export default race
