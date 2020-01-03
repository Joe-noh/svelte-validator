export function betweenLength([min, max]) {
  return {
    name: 'betweenLength',
    argument: [min, max],
    isValid: (value) => {
      const length = value.length
      return min <= length && length <= max
    }
  }
}
