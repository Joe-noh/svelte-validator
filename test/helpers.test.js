import { hasError } from '../src/helpers'

describe('hasError', () => {
  test('returns true if given object is not empty', () => {
    expect(hasError({})).toEqual(false)
    expect(hasError({ required: undefined })).toEqual(true)
  })
})
