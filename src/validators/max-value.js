export function maxValue(amount, object = {}) {
  return {
    name: 'maxValue',
    argument: amount,
    object,
    isValid: (value) => {
      return value <= amount
    }
  }
}
