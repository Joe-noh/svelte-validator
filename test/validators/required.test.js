import { required } from '../../src/index'

describe('required', () => {
  test('return value', () => {
    const { name, argument, object, isValid } = required()

    expect(name).toEqual('required')
    expect(argument).toBeUndefined()
    expect(object).toEqual(expect.any(Object))
    expect(isValid).toEqual(expect.any(Function))
  })

  describe('isValid', () => {
    test('false with empty string', () => {
      const { isValid } = required()

      expect(isValid('')).toEqual(false)
    })

    test('false with null', () => {
      const { isValid } = required()

      expect(isValid(null)).toEqual(false)
    })

    test('false with undefined', () => {
      const { isValid } = required()

      expect(isValid(undefined)).toEqual(false)
    })

    test('returns true for others', () => {
      const { isValid } = required()

      expect(isValid('123')).toEqual(true)
      expect(isValid(10000)).toEqual(true)
      expect(isValid(['a'])).toEqual(true)
    })
  })
})
