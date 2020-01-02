'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var store = require('svelte/store');

function createValidator({ rules }) {
  const validator = createValidatorFun();

  const valueStore = store.writable('');
  const errorStore = store.derived(valueStore, (value) => validator(value));

  return [valueStore, errorStore]
}

function createValidatorFun(rules) {
  return (value) => {
    return true
  }
}

exports.createValidator = createValidator;
