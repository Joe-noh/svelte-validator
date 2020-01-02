'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var store = require('svelte/store');

function required(value, opts) {
  return value !== null && value !== undefined
}

var validators = /*#__PURE__*/Object.freeze({
  __proto__: null,
  required: required
});

function createValidator({ rules }) {
  const validator = createValidatorFun(rules);

  const valueStore = store.writable('');
  const errorStore = store.derived(valueStore, (value) => validator(value));

  return [valueStore, errorStore]
}

function createValidatorFun(rules) {
  return (value) => {
    return Object.keys(rules).reduce((violated, ruleName) => {
      const validator = validators[ruleName];

      validator(value, rules[ruleName]) ? [...violated, ruleName] : violated;
    }, [])
  }
}

exports.createValidator = createValidator;
