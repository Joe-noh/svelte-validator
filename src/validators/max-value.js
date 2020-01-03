export function maxValue(amount, options = {}) {
  return {
    name: 'maxValue',
    argument: amount,
    options,
    isValid: (value) => {
      return value <= amount
    }
  }
}
