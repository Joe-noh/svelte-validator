'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var store = require('svelte/store');

function createValidator({ initial, rules }) {
  const validator = createValidatorFun(rules);

  const valueStore = store.writable(initial);
  const errorStore = store.derived(valueStore, (value) => validator(value));

  return [valueStore, errorStore]
}

function createValidatorFun(rules) {
  return (value) => {
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

exports.default = createValidator;
exports.minLength = minLength;
exports.required = required;
