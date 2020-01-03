export function hasError(errorObject) {
  return Object.keys(errorObject).length > 0
}

export function getErrorOptions(errorObject, errorNames, key = null) {
  return errorNames.reduce((acc, name) => {
    if (name in errorObject) {
      const value = key ? errorObject[name][key] : errorObject[name]
      return [...acc, value]
    } else {
      return acc
    }
  }, [])
}
