export function equal(val, object = {}) {
  return {
    name: 'equal',
    argument: val,
    object,
    isValid: (value) => {
      return value === val
    }
  }
}
