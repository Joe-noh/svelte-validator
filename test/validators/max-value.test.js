import { maxValue } from '../../src/validators/max-value'

describe('maxValue', () => {
  describe('return value', () => {
    const { name, argument, isValid } = maxValue(10)

    expect(name).toEqual('maxValue')
    expect(argument).toEqual(10)
    expect(isValid).toEqual(expect.any(Function))
  })

  describe('isValid', () => {
    test('false if value is greater than or equal to given argument', () => {
      const { isValid } = maxValue(10)

      expect(isValid(9)).toEqual(true)
      expect(isValid(10)).toEqual(true)
      expect(isValid(11)).toEqual(false)
    })
  })
})
