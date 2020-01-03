export function maxLength(length) {
  return {
    name: 'maxLength',
    argument: length,
    isValid: (value) => {
      return value.length <= length
    }
  }
}
