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

    'no-console': 'off',
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
      files: ['*stories.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['./src/assets/index.ts'],
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
          ['@components', './src/components/index'],
          ['@pages', './src/pages/index'],
          ['@router', './src/router/index'],
          ['@services', './src/services/index'],
          ['@types', './src/types/index'],
          ['@constants', './src/constants/index'],
          ['@utils', './src/utils/index'],
          ['@context', './src/context/index'],
          ['@store', './src/store/index'],
          ['@assets', './src/assets/index'],
          ['@hooks', './src/hooks/index'],
          ['@ui', './src/components/UI/index'],
        ],
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
