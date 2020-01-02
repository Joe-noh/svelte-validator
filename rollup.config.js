import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    name: 'svelte-validator',
    file: 'dist/index.js',
    format: 'umd'
  },
  plugins: [
    resolve()
  ]
}