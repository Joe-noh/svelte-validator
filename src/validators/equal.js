export function equal(val, error) {
  return {
    name: 'equal',
    argument: val,
    error,
    isValid: (value) => {
      return value === val
    }
  }
}
