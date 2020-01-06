import { writable, derived } from 'svelte/store';

function createValidator(opts) {
  const { initial, rules } = opts;
  const validator = createValidatorFun(rules);

  const configStore = writable(config(opts));
  const valueStore = writable(initial);
  const errorStore = derived([valueStore, configStore], ([value, config]) => validator(value, config));

  const activate = () => {
    configStore.update(config => ({ ...config, active: true }));
  };

  return [valueStore, errorStore, { activate }]
}

function createValidatorFun(rules) {
  return (value, config) => {
    if (!config.active) { return {} }

    return rules.reduce((violated, rule) => {
      const { name, isValid, argument, object } = rule;

      if (isValid(value)) {
        return violated
      } else {
        return {...violated, [name]: { ...object, argument}}
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

function required(object = {}) {
  return {
    name: 'required',
    argument: undefined,
    object,
    isValid: (value) => {
      if (typeof value === 'string') {
        return value.trim() !== ''
      }

      return value !== null && value !== undefined
    }
  }
}

function equal(val, object = {}) {
  return {
    name: 'equal',
    argument: val,
    object,
    isValid: (value) => {
      return value === val
    }
  }
}

function minLength(length, object = {}) {
  return {
    name: 'minLength',
    argument: length,
    object,
    isValid: (value) => {
      return value.length >= length
    }
  }
}

function maxLength(length, object = {}) {
  return {
    name: 'maxLength',
    argument: length,
    object,
    isValid: (value) => {
      return value.length <= length
    }
  }
}

function betweenLength([min, max], object = {}) {
  return {
    name: 'betweenLength',
    argument: [min, max],
    object,
    isValid: (value) => {
      const length = value.length;
      return min <= length && length <= max
    }
  }
}

function minValue(amount, object = {}) {
  return {
    name: 'minValue',
    argument: amount,
    object,
    isValid: (value) => {
      return value >= amount
    }
  }
}

function maxValue(amount, object = {}) {
  return {
    name: 'maxValue',
    argument: amount,
    object,
    isValid: (value) => {
      return value <= amount
    }
  }
}

function betweenValue([min, max], object = {}) {
  return {
    name: 'betweenValue',
    argument: [min, max],
    object,
    isValid: (value) => {
      return min <= value && value <= max
    }
  }
}

function format(regex, object = {}) {
  return {
    name: 'format',
    argument: regex,
    object,
    isValid: (value) => {
      return regex.test(value)
    }
  }
}

function not(validator) {
  const { name, isValid } = validator;

  return {
    ...validator,
    name: appendNot(name),
    isValid: (value) => !isValid(value),
  }
}

function appendNot(name) {
  return 'not' + name.slice(0, 1).toUpperCase() + name.slice(1)
}

function hasError(errorObject) {
  return Object.keys(errorObject).length > 0
}

function getErrors(errorObject, errorNames, key = null) {
  return errorNames.reduce((acc, name) => {
    if (name in errorObject) {
      const value = key ? errorObject[name][key] : errorObject[name];
      return [...acc, value]
    } else {
      return acc
    }
  }, [])
}

export default createValidator;
export { betweenLength, betweenValue, equal, format, getErrors, hasError, maxLength, maxValue, minLength, minValue, not, required };
