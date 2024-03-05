module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import', '@stylistic', 'prettier'],
  extends: ['prettier', 'plugin:@typescript-eslint/recommended', 'plugin:import/recommended'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            '^\\u0000',
            '^react',
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
            '^@?\\w',
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
            '^.+\\.s?css$',
          ],
        ],
      },
    ],

    'no-console': 'error',
    '@stylistic/arrow-parens': ['error', 'always'],
    '@stylistic/padding-line-between-statements': [
      'error',

      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },

      { blankLine: 'always', prev: '*', next: 'multiline-expression' },
      { blankLine: 'always', prev: 'multiline-expression', next: '*' },

      { blankLine: 'always', prev: '*', next: 'multiline-const' },
      { blankLine: 'always', prev: 'multiline-const', next: '*' },

      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'export' },

      { blankLine: 'any', prev: 'import', next: 'import' },
    ],
  },
  overrides: [
    {
      files: ['./src/assets/index.ts', './src/App.tsx', './src/store/index.ts'],
      rules: {
        'import/no-unresolved': 'off',
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
        map: [
          ['@components', './src/components'],
          ['@pages', './src/pages'],
          ['@router', './src/router'],
          ['@services', './src/services'],
          ['@models', './src/models'],
          ['@constants', './src/constants'],
          ['@utils', './src/utils'],
          ['@context', './src/context'],
          ['@store', './src/store'],
          ['@assets', './src/assets'],
          ['@hooks', './src/hooks'],
        ],
        extensions: ['.tsx', '.ts'],
      },
    },
  },

  ignorePatterns: [
    '__test__/**/*',
    '*.eslintrc.js',
    '*.config.cjs',
    '*.config.ts',
    '*.config.js',
    '/dist',
    '/cypress/*',
  ],
}
