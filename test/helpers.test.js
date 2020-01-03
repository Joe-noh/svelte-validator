import { hasError, getErrorOptions } from '../src/index'

describe('hasError', () => {
  test('returns true if given object is not empty', () => {
    expect(hasError({})).toEqual(false)
    expect(hasError({ required: undefined })).toEqual(true)
  })
})

describe('getErrorOptions', () => {
  test('returns array of options', () => {
    const errors = {
      required: { message: 'Can not be blank' },
      minLength: { message: 'Too short.' },
    }

    const options = getErrorOptions(errors, ['required', 'minLength'])
    expect(options[0]).toEqual(errors.required)
    expect(options[1]).toEqual(errors.minLength)
    expect(options.length).toEqual(Object.keys(errors).length)
  })

  test('dig options if key is given', () => {
    const errors = {
      required: { message: 'Can not be blank' },
      minLength: { message: 'Too short.' },
    }

    const messages = getErrorOptions(errors, ['required', 'minLength'], 'message')
    expect(messages[0]).toEqual(errors.required.message)
    expect(messages[1]).toEqual(errors.minLength.message)

    expect(messages.length).toEqual(Object.keys(errors).length)
  })
})
