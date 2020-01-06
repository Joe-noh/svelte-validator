export function betweenLength([min, max], object = {}) {
  return {
    name: 'betweenLength',
    argument: [min, max],
    object,
    isValid: (value) => {
      const length = value.length
      return min <= length && length <= max
    }
  }
}
