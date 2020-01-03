export function betweenValue([min, max]) {
  return {
    name: 'betweenValue',
    argument: [min, max],
    isValid: (value) => {
      return min <= value && value <= max
    }
  }
}
