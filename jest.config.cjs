/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  extensionsToTreatAsEsm: ['.tsx'],
  collectCoverageFrom: [
    './src/**/*.{ts,tsx,js}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!./src/index.tsx',
    '!src/**/*.stories.tsx',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__test__/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    '^@components': '<rootDir>/src/components/index',
    '^@pages': '<rootDir>/src/pages/index',
    '^@router': '<rootDir>/src/router/index',
    '^@auth': '<rootDir>/src/auth/index',
    '^@types': '<rootDir>/src/types/index',
    '^@constants': '<rootDir>/src/constants/index',
    '^@utils': '<rootDir>/src/utils/index',
    '^@context': '<rootDir>/src/context/index',
    '^@store': '<rootDir>/src/store/index',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  setupFiles: ['<rootDir>/__test__/jest.polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/__test__/jest.setup.js'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
}
