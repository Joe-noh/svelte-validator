export function minLength(length, options = {}) {
  return {
    name: 'minLength',
    argument: length,
    options,
    isValid: (value) => {
      return value.length >= length
    }
  }
}
