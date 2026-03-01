import { mount } from '@vue/test-utils'
import TrackLane from '@/components/track/TrackLane.vue'

const mockHorse = {
    id: 1,
    name: 'Thunder',
    color: 'red'
}

describe('TrackLane', () => {
   it('generates 10 horses', () => {
  const horses = generateHorses()
  expect(horses).toHaveLength(10)
})

it('each horse has required properties', () => {
  const horses = generateHorses()

  horses.forEach(horse => {
    expect(horse).toHaveProperty('id')
    expect(horse).toHaveProperty('name')
    expect(horse).toHaveProperty('speed')
  })
})

it('speed is within expected range', () => {
  const horses = generateHorses()

  horses.forEach(horse => {
    expect(horse.speed).toBeGreaterThanOrEqual(2)
    expect(horse.speed).toBeLessThanOrEqual(4)
  })
})
})
