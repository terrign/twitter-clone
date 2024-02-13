module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort', 'import', '@stylistic'],
  extends: [
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@stylistic/recommended-extends',
    'plugin:import/recommended',
  ],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'no-console': 'error',
    '@stylistic/padding-line-between-statements': [
      'error',

      { blankLine: 'always', prev: '*', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
    ],
  },
  overrides: [
    {
      files: ['*stories.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  settings: {
    'react': {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [['@components', './src/components']],
        extensions: ['.tsx', '.ts'],
      },
    },
  },
  ignorePatterns: [
    '__test__/**/*',
    '*.eslintrc.cjs',
    '*.config.cjs',
    '*.config.ts',
    '*.config.js',
    '/dist',
    '/cypress/*',
  ],
}
