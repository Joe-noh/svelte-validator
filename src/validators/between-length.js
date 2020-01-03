export function betweenLength([min, max], options = {}) {
  return {
    name: 'betweenLength',
    argument: [min, max],
    options,
    isValid: (value) => {
      const length = value.length
      return min <= length && length <= max
    }
  }
}
