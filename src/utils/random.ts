export function generateRandomHorses(total = 20) {
    const colors = generateUniqueColors(total)

    return Array.from({ length: total }).map((_, i) => ({
        id: i + 1,
        name: `Horse ${i + 1}`,
        color: colors[i],
        condition: randomBetween(1, 100),
        speed:    randomBetween(1, 5)

    }))
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateUniqueColors(count) {
    return Array.from({ length: count }).map((_, i) =>
        `hsl(${(i * 360) / count}, 70%, 50%)`
    )
}
