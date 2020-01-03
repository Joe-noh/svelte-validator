export function minValue(amount) {
  return {
    name: 'minValue',
    argument: amount,
    isValid: (value) => {
      return value >= amount
    }
  }
}
