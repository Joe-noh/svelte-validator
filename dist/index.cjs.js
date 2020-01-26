'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var svelte = require('svelte');
var store = require('svelte/store');

function create(opts) {
  const { initial, rules } = opts;
  const validator = createValidatorFun(rules);

  const configStore = store.writable(config(opts));
  const valueStore = store.writable(initial);
  const errorStore = store.derived([valueStore, configStore], ([value, config]) => validator(value, config));

  const activate = () => {
    configStore.update(config => ({ ...config, active: true }));
  };

  return [
    { ...valueStore, activate },
    errorStore,
  ]
}

function createValidatorFun(rules) {
  return (value, config) => {
    if (!config.active) { return {} }

    return rules.reduce((violated, rule) => {
      const { name, isValid, argument, error } = rule;

      if (isValid(value)) {
        return violated
      } else {
        return {...violated, [name]: { ...error, argument}}
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

function deriveErrors(errorStores) {
  return store.derived(errorStores, errors => {
    return errors.filter(error => Object.keys(error).length !== 0)
  })
}

function validateAll(valueStores) {
  valueStores.forEach(store => store.activate());
  return svelte.tick()
}

var svelteValidator = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create,
  deriveErrors: deriveErrors,
  validateAll: validateAll
});

function required(error) {
  return {
    name: 'required',
    argument: undefined,
    error,
    isValid: (value) => {
      if (typeof value === 'string') {
        return value.trim() !== ''
      }

      return value !== null && value !== undefined
    }
  }
}

function equal(val, error) {
  return {
    name: 'equal',
    argument: val,
    error,
    isValid: (value) => {
      return value === val
    }
  }
}

function minLength(length, error) {
  return {
    name: 'minLength',
    argument: length,
    error,
    isValid: (value) => {
      return value.length >= length
    }
  }
}

function maxLength(length, error) {
  return {
    name: 'maxLength',
    argument: length,
    error,
    isValid: (value) => {
      return value.length <= length
    }
  }
}

function betweenLength([min, max], error) {
  return {
    name: 'betweenLength',
    argument: [min, max],
    error,
    isValid: (value) => {
      const length = value.length;
      return min <= length && length <= max
    }
  }
}

function minValue(amount, error) {
  return {
    name: 'minValue',
    argument: amount,
    error,
    isValid: (value) => {
      return value >= amount
    }
  }
}

function maxValue(amount, error) {
  return {
    name: 'maxValue',
    argument: amount,
    error,
    isValid: (value) => {
      return value <= amount
    }
  }
}

function betweenValue([min, max], error) {
  return {
    name: 'betweenValue',
    argument: [min, max],
    error,
    isValid: (value) => {
      return min <= value && value <= max
    }
  }
}

function format(regex, error) {
  return {
    name: 'format',
    argument: regex,
    error,
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

exports.betweenLength = betweenLength;
exports.betweenValue = betweenValue;
exports.default = svelteValidator;
exports.equal = equal;
exports.format = format;
exports.maxLength = maxLength;
exports.maxValue = maxValue;
exports.minLength = minLength;
exports.minValue = minValue;
exports.not = not;
exports.required = required;
