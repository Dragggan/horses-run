import { createStore } from 'vuex'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import horses from '@/store/horsesStore'
import { generateRandomHorses } from '@/utils/random'

vi.mock('@/utils/random', () => ({
    generateRandomHorses: vi.fn()
}))

describe('Horses Store', () => {
    let store: any

    beforeEach(() => {
        store = createStore({
            modules: {
                horses
            }
        })

        vi.clearAllMocks()
    })

    it('has correct initial state', () => {
        expect(store.state.horses.all).toEqual([])
    })

    it('generateHorses calls generateRandomHorses with 20', async () => {
        ; (generateRandomHorses as any).mockReturnValue([
            { id: 1, name: 'Thunder', speed: 3 }
        ])

        await store.dispatch('horses/generateHorses')

        expect(generateRandomHorses).toHaveBeenCalledWith(20)
    })

    it('generateHorses commits horses to state', async () => {
        const mockHorses = [
            { id: 1, name: 'Thunder', speed: 3 },
            { id: 2, name: 'Storm', speed: 4 }
        ]

            ; (generateRandomHorses as any).mockReturnValue(mockHorses)

        await store.dispatch('horses/generateHorses')

        expect(store.state.horses.all).toEqual(mockHorses)
    })

    it('getter allHorses returns horses', async () => {
        const mockHorses = [
            { id: 1, name: 'Thunder', speed: 3 }
        ]

            ; (generateRandomHorses as any).mockReturnValue(mockHorses)

        await store.dispatch('horses/generateHorses')

        expect(store.getters['horses/allHorses']).toEqual(mockHorses)
    })
})
