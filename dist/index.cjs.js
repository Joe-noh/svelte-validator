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
      const { name, isValid, argument } = rule;

      if (isValid(value)) {
        return violated
      } else {
        return {...violated, [name]: argument}
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

function required() {
  return {
    name: 'required',
    argument: undefined,
    isValid: (value) => {
      if (typeof value === 'string') {
        return value.trim() !== ''
      }

      return value !== null && value !== undefined
    }
  }
}

function minLength(length) {
  return {
    name: 'minLength',
    argument: length,
    isValid: (value) => {
      return value.length >= length
    }
  }
}

function maxLength(length) {
  return {
    name: 'maxLength',
    argument: length,
    isValid: (value) => {
      return value.length <= length
    }
  }
}

function betweenLength([min, max]) {
  return {
    name: 'betweenLength',
    argument: [min, max],
    isValid: (value) => {
      const length = value.length;
      return min <= length && length <= max
    }
  }
}

function minValue(amount) {
  return {
    name: 'minValue',
    argument: amount,
    isValid: (value) => {
      return value >= amount
    }
  }
}

function maxValue(amount) {
  return {
    name: 'maxValue',
    argument: amount,
    isValid: (value) => {
      return value <= amount
    }
  }
}

function betweenValue([min, max]) {
  return {
    name: 'betweenValue',
    argument: [min, max],
    isValid: (value) => {
      return min <= value && value <= max
    }
  }
}

function format(regex) {
  return {
    name: 'format',
    argument: regex,
    isValid: (value) => {
      return regex.test(value)
    }
  }
}

function hasError(errorObject) {
  return Object.keys(errorObject).length > 0
}

exports.betweenLength = betweenLength;
exports.betweenValue = betweenValue;
exports.default = createValidator;
exports.format = format;
exports.hasError = hasError;
exports.maxLength = maxLength;
exports.maxValue = maxValue;
exports.minLength = minLength;
exports.minValue = minValue;
exports.required = required;
