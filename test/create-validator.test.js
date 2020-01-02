import { get } from 'svelte/store'
import { createValidator } from '../src/create-validator'

describe('createValidator', () => {
  test('returns svelte stores', () => {
    const [valueStore, errorStore] = createValidator({ rules: [] })

    expect(valueStore).toMatchObject({
      set: expect.any(Function),
      update: expect.any(Function),
      subscribe: expect.any(Function),
    })

    expect(errorStore).toMatchObject({
      subscribe: expect.any(Function),
    })
  })

  test('use given initial value', () => {
    const [valueStore] = createValidator({ initial: 'initial value', rules: [] })

    expect(get(valueStore)).toEqual('initial value')
  })
})
