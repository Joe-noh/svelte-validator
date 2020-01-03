import { maxValue } from '../../src/index'

describe('maxValue', () => {
  describe('return value', () => {
    const { name, argument, options, isValid } = maxValue(10)

    expect(name).toEqual('maxValue')
    expect(argument).toEqual(10)
    expect(options).toEqual(expect.any(Object))
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
