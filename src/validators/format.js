export function format(regex, error) {
  return {
    name: 'format',
    argument: regex,
    error,
    isValid: (value) => {
      return regex.test(value)
    }
  }
}
