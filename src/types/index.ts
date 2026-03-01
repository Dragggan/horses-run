export interface Horse {
    id: number
    name: string
    color: string
    condition: number
}

export interface Round {
    round: number
    distance: number
    horses: Horse[]
}

export interface HorseResult {
    horseId: number
    name: string
    color: string
    time: number
    speed:number
}

export interface RoundResult {
    round: number
    distance: number
    standings: HorseResult[]
}
