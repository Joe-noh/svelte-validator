export function required(object = {}) {
  return {
    name: 'required',
    argument: undefined,
    object,
    isValid: (value) => {
      if (typeof value === 'string') {
        return value.trim() !== ''
      }

      return value !== null && value !== undefined
    }
  }
}
