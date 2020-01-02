import { get } from 'svelte/store'
import createValidator, { required, minLength } from '../src/index'

describe('integration', () => {
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
