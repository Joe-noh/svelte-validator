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

  const [valueStore, errorStore] = createValidator({
    initial: '',
    rules: [
      required(),
      minLength(3),
    ]
  })
</script>

<form>
  <input bind:value="{valueStore}">
  {#if 'required' in $errorStore}
    <span>Can't be blank!</span>
  {/if}
  {#if 'minLength' in $errorStore}
    <span>Should be longer than {$errorStore.minLength}</span>
  {/if}

  <button type="submit" disabled="{hasError($errorStore)}">Submit</button>
</form>
```

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
