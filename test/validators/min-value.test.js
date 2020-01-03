import { minValue } from '../../src/index'

describe('minValue', () => {
  describe('return value', () => {
    const { name, argument, isValid } = minValue(10)

    expect(name).toEqual('minValue')
    expect(argument).toEqual(10)
    expect(isValid).toEqual(expect.any(Function))
  })

  describe('isValid', () => {
    test('false if value is smaller than or equal to given argument', () => {
      const { isValid } = minValue(0)

      expect(isValid(-1)).toEqual(false)
      expect(isValid(0)).toEqual(true)
      expect(isValid(1)).toEqual(true)
    })
  })
})
