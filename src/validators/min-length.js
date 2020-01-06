export function minLength(length, object = {}) {
  return {
    name: 'minLength',
    argument: length,
    object,
    isValid: (value) => {
      return value.length >= length
    }
  }
}
