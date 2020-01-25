export function betweenValue([min, max], error) {
  return {
    name: 'betweenValue',
    argument: [min, max],
    error,
    isValid: (value) => {
      return min <= value && value <= max
    }
  }
}
