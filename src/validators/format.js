export function format(regex, object = {}) {
  return {
    name: 'format',
    argument: regex,
    object,
    isValid: (value) => {
      return regex.test(value)
    }
  }
}
