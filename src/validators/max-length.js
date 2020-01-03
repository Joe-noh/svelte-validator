export function maxLength(length, options = {}) {
  return {
    name: 'maxLength',
    argument: length,
    options,
    isValid: (value) => {
      return value.length <= length
    }
  }
}
