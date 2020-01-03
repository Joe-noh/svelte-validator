import { writable, derived } from 'svelte/store'

export function createValidator(opts) {
  const { initial, rules } = opts
  const validator = createValidatorFun(rules)

  const configStore = writable(config(opts))
  const valueStore = writable(initial)
  const errorStore = derived([valueStore, configStore], ([value, config]) => validator(value, config))

  const activate = () => {
    configStore.update(config => ({ ...config, active: true }))
  }

  return [valueStore, errorStore, { activate }]
}

function createValidatorFun(rules) {
  return (value, config) => {
    if (!config.active) { return {} }

    return rules.reduce((violated, rule) => {
      const { name, isValid, argument, options } = rule

      if (isValid(value)) {
        return violated
      } else {
        return {...violated, [name]: { ...options, argument}}
      }
    }, {})
  }
}

function config(opts) {
  return {
    active: fetch(opts, 'immediate', true)
  }
}

function fetch(opts, key, fallback) {
  return key in opts ? opts[key] : fallback
}
