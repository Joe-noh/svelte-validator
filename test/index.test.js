import { get } from 'svelte/store'
import svelteValidator, { required, minLength } from '../src/index'

describe('integration', () => {
  test('validates reactively', () => {
    const rules = [required(), minLength(3)]
    const [valueStore, errorStore] = svelteValidator.create({ initial: '', rules })

    let errors = get(errorStore)
    expect(Object.keys(errors)).toEqual(expect.arrayContaining(['required', 'minLength']))

    valueStore.set('he')

    errors = get(errorStore)
    expect(Object.keys(errors)).toEqual(expect.arrayContaining(['minLength']))

    valueStore.set('hello')

    errors = get(errorStore)
    expect(Object.keys(errors)).toEqual([])
  })

  test('can acccess given argument and object via error store', () => {
    const rules = [minLength(3, { message: 'Too short!'})]
    const [valueStore, errorStore] = svelteValidator.create({ initial: 'a', rules })

    let errors = get(errorStore)
    expect(errors.minLength.argument).toEqual(3)
    expect(errors.minLength.message).toEqual('Too short!')
  })

  test('immediate: false delays validation until calling activate', () => {
    const rules = [minLength(3)]
    const [valueStore, errorStore] = svelteValidator.create({ rules, immediate: false })

    let errors = get(errorStore)
    expect(Object.keys(errors)).toEqual([])

    valueStore.set('he')

    errors = get(errorStore)
    expect(Object.keys(errors)).toEqual([])

    valueStore.activate()

    errors = get(errorStore)
    expect(Object.keys(errors)).toEqual(expect.arrayContaining(['minLength']))
  })
})

describe('custom validator', () => {
  test('the name is included on error', () => {
    const myRule = {
      name: 'theAnswer',
      isValid: (value) => value === 42
    }
    const [valueStore, errorStore] = svelteValidator.create({ initial: 0, rules: [myRule] })

    let errors = get(errorStore)
    expect(Object.keys(errors)).toEqual(['theAnswer'])

    valueStore.set(42)

    errors = get(errorStore)
    expect(Object.keys(errors)).toEqual([])
  })
})
