import { Module } from 'vuex'
import { Round, RoundResult } from '@/types/index.js'
import { runRaceRound } from '../services/raceEngine.js'
import { RootState } from '@/state'

const ROUND_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200]

export interface RaceState {
    schedule: Round[]
    results: RoundResult[]
    activeRound: Round | null
    isRunning: boolean
    raceInProgress: boolean
}

const race: Module<RaceState, RootState> = {
    namespaced: true,

    state: (): RaceState => ({
        schedule: [],
        results: [],
        activeRound: null,
        isRunning: false,
        raceInProgress:false
    }),

    mutations: {
        SET_SCHEDULE(state, schedule: Round[]) {
            state.schedule = schedule
        },
        SET_RUNNING(state, value: boolean) {
            state.isRunning = value
        },
        RACE_IN_PROGRESS(state, value: boolean) {
            state.raceInProgress = value
        },
        SET_ACTIVE_ROUND(state, round: Round | null) {
            state.activeRound = round
        },
        ADD_RESULT(state, result: RoundResult) {
            state.results.push(result)
            state.isRunning = false
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

            if (!state.schedule.length) return
            commit("RACE_IN_PROGRESS",true)

            for (const round of state.schedule) {
                if (!state.isRunning) {
                   commit('SET_RUNNING', true)
                }
                commit('SET_ACTIVE_ROUND', round)
                const result = await runRaceRound(round)
                commit('ADD_RESULT', result)

                await delay(500)
            }
            commit("RACE_IN_PROGRESS",false)

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
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

export default race
