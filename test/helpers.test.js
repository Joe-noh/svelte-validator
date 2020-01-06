import { hasError, getErrors } from '../src/index'

describe('hasError', () => {
  test('returns true if given object is not empty', () => {
    expect(hasError({})).toEqual(false)
    expect(hasError({ required: undefined })).toEqual(true)
  })
})

describe('getErrors', () => {
  test('returns array of options', () => {
    const errors = {
      required: { message: 'Can not be blank' },
      minLength: { message: 'Too short.' },
    }

    const options = getErrors(errors, ['required', 'minLength'])
    expect(options[0]).toEqual(errors.required)
    expect(options[1]).toEqual(errors.minLength)
    expect(options.length).toEqual(Object.keys(errors).length)
  })

  test('dig options if key is given', () => {
    const errors = {
      required: { message: 'Can not be blank' },
      minLength: { message: 'Too short.' },
    }

    const messages = getErrors(errors, ['required', 'minLength'], 'message')
    expect(messages[0]).toEqual(errors.required.message)
    expect(messages[1]).toEqual(errors.minLength.message)

    expect(messages.length).toEqual(Object.keys(errors).length)
  })
})
