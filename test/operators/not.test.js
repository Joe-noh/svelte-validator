import { not, betweenLength } from '../../src/index'

describe('not', () => {
  test('append "not" to name', () => {
    const { name } = not(betweenLength([1, 3]))

    expect(name).toEqual('notBetweenLength')
  })

  test('invert isValid', () => {
    const { isValid } = not(betweenLength([1, 2]))

    expect(isValid('')).toEqual(true)
    expect(isValid('a')).toEqual(false)
    expect(isValid('ab')).toEqual(false)
    expect(isValid('abc')).toEqual(true)
  })
})
