export function minValue(amount, options = {}) {
  return {
    name: 'minValue',
    argument: amount,
    options,
    isValid: (value) => {
      return value >= amount
    }
  }
}
