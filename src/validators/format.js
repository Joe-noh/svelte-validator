export function format(regex) {
  return {
    name: 'format',
    argument: regex,
    isValid: (value) => {
      return regex.test(value)
    }
  }
}
