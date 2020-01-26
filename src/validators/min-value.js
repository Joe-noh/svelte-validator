export function minValue(amount, error) {
  return {
    name: 'minValue',
    argument: amount,
    error,
    isValid: (value) => {
      return value >= amount
    }
  }
}
