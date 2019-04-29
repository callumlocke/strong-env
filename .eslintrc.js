const rules = {
  'import/prefer-default-export': 'off',

  '@typescript-eslint/indent': ['off'],

  'arrow-parens': 'off',

  semi: ['error', 'never'],

  '@typescript-eslint/member-delimiter-style': [
    'error',
    {
      multiline: {
        delimiter: 'none',
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false,
      },
    },
  ],
}

module.exports = {
  root: true,
  extends: ['plugin:@typescript-eslint/recommended', 'airbnb'],
  plugins: ['import', 'prettier', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules,
}
