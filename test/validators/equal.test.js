import { equal } from '../../src/index'

describe('equal', () => {
  test('return value', () => {
    const { name, argument, object, isValid } = equal(10)

    expect(name).toEqual('equal')
    expect(argument).toEqual(10)
    expect(object).toEqual(expect.any(Object))
    expect(isValid).toEqual(expect.any(Function))
  })

  describe('isValid', () => {
    test('true if value is equal to given argument', () => {
      const { isValid } = equal(10)

      expect(isValid(9)).toEqual(false)
      expect(isValid(10)).toEqual(true)
      expect(isValid(11)).toEqual(false)
    })
  })
})
