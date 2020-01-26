# svelte-validator

## Install

This is WIP project. Use at your own responsibility!

```
npm i -S svelte-validator
```

## Usage

```html
<script>
  import svelteValidator, { required, minLength, equal, not, hasError } from 'svelte-validator'

  const [valueStore, errorStore, command] = svelteValidator.create({
    initial: '',
    rules: [
      required({ message: 'Cannot be blank!' }),
      minLength(3, { message: 'Should be longer than 3.' }),
      not(equal(10, { message: 'Should not equal to 10.' })),
    ]
  })
</script>

<form>
  <input bind:value="{$valueStore}">
  {#if 'required' in $errorStore}
    <span>{$errorStore.required.message}</span>
  {/if}
  {#if 'minLength' in $errorStore}
    <span>{$errorStore.minLength.message}</span>
  {/if}
  {#if 'notEqual' in $errorStore}
    <span>{$errorStore.notEqual.message}</span>
  {/if}

  <button type="submit" disabled="{hasError($errorStore)}">Submit</button>
</form>
```

### `createValidator` Options

#### `rules`

An array of validators.

#### `initial`

Initial value of `valueStore`.

#### `immediate`

If `false`, validation does not run until calling `command.activate()`. Default `true`.
For example this can be used to prevent from displaying errors until first blur event occurs.

```html
<input type="text" on:blur="{command.activate}">
```

### Builtin Validators

- `required(error)`
- `equal(value, error)`
- `minValue(min, error)`
- `maxValue(max, error)`
- `betweenValue([min, max], error)`
- `minLength(length, error)`
- `maxLength(length, error)`
- `betweenLength([min, max], error)`
- `format(regex, error)`
- `not(validator)`

#### `error`

Arbitrary error value.

```javascript
const [valueStore, errorStore, command] = svelteValidator.create({
  initial: '',
  rules: [
    required({ foo: 'bar' }),
  ]
})

$errorStore.required.foo // === 'bar'
```

### Custom Rule

You can implement your own validation rule. It should be an object which has `name`, `isValid` and `error` properties.

```javascript
const myRule = {
  name: 'myRule',
  isValid: (value) => {
    // true or false
  },
  error: { message: '...', color: 'red' }
}

const [valueStore, errorStore] = svelteValidator.create({ rules: [myRule] })
// $errorStore.myRule appears when value violates the rule.
```
