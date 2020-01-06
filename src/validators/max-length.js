export function maxLength(length, object = {}) {
  return {
    name: 'maxLength',
    argument: length,
    object,
    isValid: (value) => {
      return value.length <= length
    }
  }
}
