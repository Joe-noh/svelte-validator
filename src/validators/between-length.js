export function betweenLength([min, max], error) {
  return {
    name: 'betweenLength',
    argument: [min, max],
    error,
    isValid: (value) => {
      const length = value.length
      return min <= length && length <= max
    }
  }
}
