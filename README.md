# svelte-validator

## Install

This is WIP project. Use at your own responsibility!

```
npm i -S svelte-validator
```

## Usage

```html
<script>
  import createValidator, { required, minLength, hasError } from 'svelte-validator'

  const [valueStore, errorStore, command] = createValidator({
    initial: '',
    rules: [
      required({ message: 'Cannot be blank!' }), // Can put arbitrary object
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
For example this can be used to prevent display errors until first blur event occurs.

```html
<input type="text" on:blur="{command.activate}">
```

### Builtin Validators

- `required(object)`
- `equal(object)`
- `minValue(min, object)`
- `maxValue(max, object)`
- `betweenValue([min, max], object)`
- `minLength(length, object)`
- `maxLength(length, object)`
- `betweenLength([min, max], object)`
- `format(regex, object)`
- `not(validator)`

You can put any object on `object`. It can be accessed via `errorStore` like `$errorStore.minValue`. See implementation for more details.

### Custom Validator

You can implement your own validator. It should be an object which has `name` and `isValid` properties, and optionally `object`.

```javascript
const myRule = {
  name: 'myRule',
  isValid: (value) => {
    // true or false
  },
  object: { message: '...', color: 'red' }
}

const [valueStore, errorStore] = createValidator({ rules: [myRule] })
// $errorStore.myRule appears when value violates the rule.
```
