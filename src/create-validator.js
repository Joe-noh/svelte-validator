import { writable, derived } from 'svelte/store'

export function createValidator({ initial, rules }) {
  const validator = createValidatorFun(rules)

  const valueStore = writable(initial)
  const errorStore = derived(valueStore, (value) => validator(value))

  return [valueStore, errorStore]
}

function createValidatorFun(rules) {
  return (value) => {
    return rules.reduce((violated, rule) => {
      const { name, isValid, argument } = rule

      if (isValid(value)) {
        return violated
      } else {
        return {...violated, [name]: argument}
      }
    }, {})
  }
}
