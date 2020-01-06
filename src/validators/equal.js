export function equal(val, options = {}) {
  return {
    name: 'equal',
    argument: val,
    options,
    isValid: (value) => {
      return value === val
    }
  }
}
