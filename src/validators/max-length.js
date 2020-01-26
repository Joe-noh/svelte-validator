export function maxLength(length, error) {
  return {
    name: 'maxLength',
    argument: length,
    error,
    isValid: (value) => {
      return value.length <= length
    }
  }
}
