export function required(options = {}) {
  return {
    name: 'required',
    argument: undefined,
    options,
    isValid: (value) => {
      if (typeof value === 'string') {
        return value.trim() !== ''
      }

      return value !== null && value !== undefined
    }
  }
}
