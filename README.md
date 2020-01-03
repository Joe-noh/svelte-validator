## svelte-validator

### Usage

This is WIP project. Use at your own responsibility!

```
npm i -S Joe-noh/svelte-validator#master
```

### Usage

```html
<script>
  import createValidator, { required, minLength, hasError } from 'svelte-validator'

  const [valueStore, errorStore, command] = createValidator({
    initial: '',
    rules: [
      required(),
      minLength(3),
    ]
  })
</script>

<form>
  <input bind:value="{$valueStore}">
  {#if 'required' in $errorStore}
    <span>Can't be blank!</span>
  {/if}
  {#if 'minLength' in $errorStore}
    <span>Should be longer than {$errorStore.minLength}</span>
  {/if}

  <button type="submit" disabled="{hasError($errorStore)}">Submit</button>
</form>
```

#### `createValidator` Options

##### `rules`

An array of validators.

##### `initial`

Initial value of `valueStore`.

##### `immediate`

If `false`, validation does not run until calling `command.activate()`. Default `true`.
For example this can be used to prevent display errors until first blur event occurs.

```html
<input type="text" on:blur="{command.activate}">
```

#### Builtin Validators

- `minValue(min)`
- `maxValue(max)`
- `betweenValue([min, max])`
- `minLength(length)`
- `maxLength(length)`
- `betweenLength([min, max])`
- `format(regex)`

See implementation for details.

#### Custom Validator

You can implement your own validator. It should be an object which has `name` and `isValid` properties.

```javascript
const myRule = {
  name: 'myRule',
  isValid: () => {
    // true or false
  },
}

createValidator({ rules: [myRule] })
```
