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
})
