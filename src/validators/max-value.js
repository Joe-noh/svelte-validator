export function maxValue(amount, error) {
  return {
    name: 'maxValue',
    argument: amount,
    error,
    isValid: (value) => {
      return value <= amount
    }
  }
}
