import { setActivePinia, createPinia } from 'pinia'
import { useRepoStore } from './store'

describe('Counter Store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('increments', () => {
    const counter = useRepoStore()
    expect(counter.count).toBe(0)
    counter.increment()
    expect(counter.count).toBe(1)
  })
})
