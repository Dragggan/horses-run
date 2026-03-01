import { Module } from 'vuex'
import { Horse } from '@/types/index.ts'
import { generateRandomHorses } from '@/utils/random.ts'

export interface HorsesState {
    all: Horse[]
}

const horses: Module<HorsesState, unknown> = {
    namespaced: true,

    state: (): HorsesState => ({
        all: []
    }),

    mutations: {
        SET_HORSES(state, horses: Horse[]) {
            state.all = horses
        }
    },

    actions: {
        generateHorses({ commit }) {
            const horses = generateRandomHorses(20)
            commit('SET_HORSES', horses)
        }
    },

    getters: {
        allHorses: state => state.all
    }
}

export default horses
