import { required } from '../src/validators'

describe('required', () => {
  test('returns false if null', () => {
    expect(required(null, {})).toBe(false)
  })

  test('returns false if undefined', () => {
    expect(required(undefined, {})).toBe(false)
  })

  test('returns true for others', () => {
    expect(required('123', {})).toBe(true)
    expect(required(10000, {})).toBe(true)
    expect(required(['a'], {})).toBe(true)
  })
})
