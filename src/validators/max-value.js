export function maxValue(amount) {
  return {
    name: 'maxValue',
    argument: amount,
    isValid: (value) => {
      return value <= amount
    }
  }
}
