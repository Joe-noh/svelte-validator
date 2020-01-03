import { get } from 'svelte/store'
import createValidator, {
  required,
  minLength,
  maxLength,
  betweenLength,
  minValue,
  maxValue,
  betweenValue,
  format,
} from '../src/index'

describe('integration', () => {
  test('exported correctly', () => {
    expect(createValidator).toEqual(expect.any(Function))
    expect(required).toEqual(expect.any(Function))
    expect(minLength).toEqual(expect.any(Function))
    expect(maxLength).toEqual(expect.any(Function))
    expect(betweenLength).toEqual(expect.any(Function))
    expect(minValue).toEqual(expect.any(Function))
    expect(maxValue).toEqual(expect.any(Function))
    expect(betweenValue).toEqual(expect.any(Function))
    expect(format).toEqual(expect.any(Function))
  })

  test('validates reactively', () => {
    const rules = [required(), minLength(3)]
    const [valueStore, errorStore] = createValidator({ initial: '', rules })

    let errors = get(errorStore)
    expect(Object.keys(errors)).toEqual(expect.arrayContaining(['required', 'minLength']))

    valueStore.set('he')

    errors = get(errorStore)
    expect(Object.keys(errors)).toEqual(expect.arrayContaining(['minLength']))

    valueStore.set('hello')

    errors = get(errorStore)
    expect(Object.keys(errors)).toEqual([])
  })
})

describe('custom validator', () => {
  test('the name is included on error', () => {
    const myRule = {
      name: 'theAnswer',
      isValid: (value) => value === 42
    }
    const [valueStore, errorStore] = createValidator({ initial: 0, rules: [myRule] })

    let errors = get(errorStore)
    expect(Object.keys(errors)).toEqual(['theAnswer'])

    valueStore.set(42)

    errors = get(errorStore)
    expect(Object.keys(errors)).toEqual([])
  })
})
