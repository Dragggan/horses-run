import { Round, RoundResult } from '@/types'

export function runRaceRound(round: Round): Promise<RoundResult> {
    return new Promise(resolve => {

        const results = round.horses.map(horse => {

            const performance =
                horse.condition * (0.6 + Math.random() * 0.8)

            const time = round.distance / performance
            return {
                horseId: horse.id,
                name: horse.name,
                color: horse.color,
                time
            }
        })

        const sorted = results.sort((a, b) => a.time - b.time)
        console.log('%c  sorted-> ', 'color:red;', sorted);
        setTimeout(() => {
            resolve({
                round: round.round,
                distance: round.distance,
                standings: sorted
            })
        }, 5000)
    })
}
