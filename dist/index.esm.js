import { writable, derived } from 'svelte/store';

function createValidator({ rules }) {
  const validator = createValidatorFun();

  const valueStore = writable('');
  const errorStore = derived(valueStore, (value) => validator(value));

  return [valueStore, errorStore]
}

function createValidatorFun(rules) {
  return (value) => {
    return true
  }
}

export { createValidator };
