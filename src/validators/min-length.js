export function minLength(length) {
  return {
    name: 'minLength',
    argument: length,
    isValid: (value) => {
      return value.length >= length
    }
  }
}
