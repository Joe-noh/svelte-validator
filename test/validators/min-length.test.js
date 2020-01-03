import { minLength } from '../../src/index'

describe('minLength', () => {
  describe('return value', () => {
    const { name, argument, isValid } = minLength(10)

    expect(name).toEqual('minLength')
    expect(argument).toEqual(10)
    expect(isValid).toEqual(expect.any(Function))
  })

  describe('isValid', () => {
    test('false if value is shorter than given argument', () => {
      const { isValid } = minLength(3)

      expect(isValid('')).toEqual(false)
      expect(isValid('a')).toEqual(false)
      expect(isValid('ab')).toEqual(false)
      expect(isValid('abc')).toEqual(true)
      expect(isValid('abcd')).toEqual(true)

      expect(isValid([])).toEqual(false)
      expect(isValid([1])).toEqual(false)
      expect(isValid([1, 2])).toEqual(false)
      expect(isValid([1, 2, 3])).toEqual(true)
      expect(isValid([1, 2, 3, 4])).toEqual(true)
    })
  })
})
