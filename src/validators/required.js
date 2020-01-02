export function required() {
  return {
    name: 'required',
    argument: undefined,
    isValid: (value) => {
      if (typeof value === 'string') {
        return value.trim() !== ''
      }

      return value !== null && value !== undefined
    }
  }
}
