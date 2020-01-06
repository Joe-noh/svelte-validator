export function betweenValue([min, max], object = {}) {
  return {
    name: 'betweenValue',
    argument: [min, max],
    object,
    isValid: (value) => {
      return min <= value && value <= max
    }
  }
}
