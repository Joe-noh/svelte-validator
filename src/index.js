import { writable, derived } from 'svelte/store'
import * as validators from './validators'

export function createValidator({ rules }) {
  const validator = createValidatorFun(rules)

  const valueStore = writable('')
  const errorStore = derived(valueStore, (value) => validator(value))

  return [valueStore, errorStore]
}

function createValidatorFun(rules) {
  return (value) => {
    return Object.keys(rules).reduce((violated, ruleName) => {
      const validator = validators[ruleName]

      return validator(value, rules[ruleName]) ? [...violated, ruleName] : violated
    }, [])
  }
}