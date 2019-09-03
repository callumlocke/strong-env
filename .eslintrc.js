module.exports = {
  root: true,
  extends: ['plugin:@typescript-eslint/recommended', 'airbnb-base'],
  plugins: ['import', 'prettier', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
  },
  rules: {
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
  },
  overrides: [
    {
      files: ['**/*.test.ts'],
      env: {
        jest: true, // now **/*.test.js files' env has both es6 *and* jest
      },
      // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
      // "extends": ["plugin:jest/recommended"]
      plugins: ['jest'],
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },

    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
}
