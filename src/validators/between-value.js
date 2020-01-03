export function betweenValue([min, max], options = {}) {
  return {
    name: 'betweenValue',
    argument: [min, max],
    options,
    isValid: (value) => {
      return min <= value && value <= max
    }
  }
}
