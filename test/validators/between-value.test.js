import { betweenValue } from '../../src/index'

describe('betweenValue', () => {
  describe('return value', () => {
    const { name, argument, options, isValid } = betweenValue([0, 10])

    expect(name).toEqual('betweenValue')
    expect(argument).toEqual([0, 10])
    expect(options).toEqual(expect.any(Object))
    expect(isValid).toEqual(expect.any(Function))
  })

  describe('isValid', () => {
    test('false if value is out of given range', () => {
      const { isValid } = betweenValue([1, 5])

      expect(isValid(0)).toEqual(false)
      expect(isValid(1)).toEqual(true)
      expect(isValid(5)).toEqual(true)
      expect(isValid(6)).toEqual(false)
    })
  })
})
