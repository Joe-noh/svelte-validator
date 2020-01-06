export function minValue(amount, object = {}) {
  return {
    name: 'minValue',
    argument: amount,
    object,
    isValid: (value) => {
      return value >= amount
    }
  }
}
