import { writable, derived } from 'svelte/store';

function required(value, opts) {
  return value !== null && value !== undefined
}

var validators = /*#__PURE__*/Object.freeze({
  __proto__: null,
  required: required
});

function createValidator({ rules }) {
  const validator = createValidatorFun(rules);

  const valueStore = writable('');
  const errorStore = derived(valueStore, (value) => validator(value));

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

export { createValidator };
