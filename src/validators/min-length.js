export function minLength(length, error) {
  return {
    name: 'minLength',
    argument: length,
    error,
    isValid: (value) => {
      return value.length >= length
    }
  }
}
