import { maxLength } from '../../src/index'

describe('maxLength', () => {
  test('return value', () => {
    const { name, argument, options, isValid } = maxLength(10)

    expect(name).toEqual('maxLength')
    expect(argument).toEqual(10)
    expect(options).toEqual(expect.any(Object))
    expect(isValid).toEqual(expect.any(Function))
  })

  describe('isValid', () => {
    test('false if value is longer than given argument', () => {
      const { isValid } = maxLength(3)

      expect(isValid('')).toEqual(true)
      expect(isValid('a')).toEqual(true)
      expect(isValid('ab')).toEqual(true)
      expect(isValid('abc')).toEqual(true)
      expect(isValid('abcd')).toEqual(false)

      expect(isValid([])).toEqual(true)
      expect(isValid([1])).toEqual(true)
      expect(isValid([1, 2])).toEqual(true)
      expect(isValid([1, 2, 3])).toEqual(true)
      expect(isValid([1, 2, 3, 4])).toEqual(false)
    })
  })
})
