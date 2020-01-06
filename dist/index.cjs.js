'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var store = require('svelte/store');

function createValidator(opts) {
  const { initial, rules } = opts;
  const validator = createValidatorFun(rules);

  const configStore = store.writable(config(opts));
  const valueStore = store.writable(initial);
  const errorStore = store.derived([valueStore, configStore], ([value, config]) => validator(value, config));

  const activate = () => {
    configStore.update(config => ({ ...config, active: true }));
  };

  return [valueStore, errorStore, { activate }]
}

function createValidatorFun(rules) {
  return (value, config) => {
    if (!config.active) { return {} }

    return rules.reduce((violated, rule) => {
      const { name, isValid, argument, options } = rule;

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

function required(options = {}) {
  return {
    name: 'required',
    argument: undefined,
    options,
    isValid: (value) => {
      if (typeof value === 'string') {
        return value.trim() !== ''
      }

      return value !== null && value !== undefined
    }
  }
}

function minLength(length, options = {}) {
  return {
    name: 'minLength',
    argument: length,
    options,
    isValid: (value) => {
      return value.length >= length
    }
  }
}

function maxLength(length, options = {}) {
  return {
    name: 'maxLength',
    argument: length,
    options,
    isValid: (value) => {
      return value.length <= length
    }
  }
}

function betweenLength([min, max], options = {}) {
  return {
    name: 'betweenLength',
    argument: [min, max],
    options,
    isValid: (value) => {
      const length = value.length;
      return min <= length && length <= max
    }
  }
}

function minValue(amount, options = {}) {
  return {
    name: 'minValue',
    argument: amount,
    options,
    isValid: (value) => {
      return value >= amount
    }
  }
}

function maxValue(amount, options = {}) {
  return {
    name: 'maxValue',
    argument: amount,
    options,
    isValid: (value) => {
      return value <= amount
    }
  }
}

function betweenValue([min, max], options = {}) {
  return {
    name: 'betweenValue',
    argument: [min, max],
    options,
    isValid: (value) => {
      return min <= value && value <= max
    }
  }
}

function format(regex, options = {}) {
  return {
    name: 'format',
    argument: regex,
    options,
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

function getErrorOptions(errorObject, errorNames, key = null) {
  return errorNames.reduce((acc, name) => {
    if (name in errorObject) {
      const value = key ? errorObject[name][key] : errorObject[name];
      return [...acc, value]
    } else {
      return acc
    }
  }, [])
}

exports.betweenLength = betweenLength;
exports.betweenValue = betweenValue;
exports.default = createValidator;
exports.format = format;
exports.getErrorOptions = getErrorOptions;
exports.hasError = hasError;
exports.maxLength = maxLength;
exports.maxValue = maxValue;
exports.minLength = minLength;
exports.minValue = minValue;
exports.not = not;
exports.required = required;
