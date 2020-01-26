export function required(error) {
  return {
    name: 'required',
    argument: undefined,
    error,
    isValid: (value) => {
      if (typeof value === 'string') {
        return value.trim() !== ''
      }

      return value !== null && value !== undefined
    }
  }
}
