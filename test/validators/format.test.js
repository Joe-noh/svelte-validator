import { format } from '../../src/index'

describe('format', () => {
  test('return value', () => {
    const { name, argument, error, isValid } = format(/regex/, {})

    expect(name).toEqual('format')
    expect(argument).toEqual(/regex/)
    expect(error).toEqual({})
    expect(isValid).toEqual(expect.any(Function))
  })

  describe('isValid', () => {
    test('false if value does not match given regex', () => {
      const { isValid } = format(/^\d{2}$/)

      expect(isValid('')).toEqual(false)
      expect(isValid('1')).toEqual(false)
      expect(isValid('12')).toEqual(true)
      expect(isValid('ab')).toEqual(false)
    })
  })
})
