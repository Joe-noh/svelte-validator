export function format(regex, options = {}) {
  return {
    name: 'format',
    argument: regex,
    options,
    isValid: (value) => {
      return regex.test(value)
    }
  }
}
