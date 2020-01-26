import { betweenValue } from '../../src/index'

describe('betweenValue', () => {
  test('return value', () => {
    const { name, argument, error, isValid } = betweenValue([0, 10], {})

    expect(name).toEqual('betweenValue')
    expect(argument).toEqual([0, 10])
    expect(error).toEqual({})
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
