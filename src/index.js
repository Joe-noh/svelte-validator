import { writable, derived } from 'svelte/store'

export function createValidator({ rules }) {
  const validator = createValidatorFun(rules)

  const valueStore = writable('')
  const errorStore = derived(valueStore, (value) => validator(value))

  return [valueStore, errorStore]
}

function createValidatorFun(rules) {
  return (value) => {
    return true
  }
}