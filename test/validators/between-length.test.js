import { betweenLength } from '../../src/index'

describe('betweenLength', () => {
  describe('return value', () => {
    const { name, argument, isValid } = betweenLength([0, 10])

    expect(name).toEqual('betweenLength')
    expect(argument).toEqual([0, 10])
    expect(isValid).toEqual(expect.any(Function))
  })

  describe('isValid', () => {
    test('false if value length is out of given range', () => {
      const { isValid } = betweenLength([1, 2])

      expect(isValid('')).toEqual(false)
      expect(isValid('a')).toEqual(true)
      expect(isValid('ab')).toEqual(true)
      expect(isValid('abc')).toEqual(false)
    })
  })
})
