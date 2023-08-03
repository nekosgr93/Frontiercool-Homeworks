module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['plugin:vue/strongly-recommended', 'plugin:vue-pug/vue3-recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'vue/no-multiple-template-root': 'off',
    'comma-dangle': 'off',
    quotes: ['error', 'single'],
  },
};
