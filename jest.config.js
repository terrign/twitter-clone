/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  extensionsToTreatAsEsm: ['.tsx', '.ts'],
  collectCoverageFrom: [
    './src/**/*.{ts,tsx,js}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!./src/index.tsx',
    '!./src/services/config.ts',
    '!.src/main.tsx',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__test__/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    // '\\.svg\\?react': '<rootDir>/__test__/__mocks__/svg.js',
    '<rootDir>/src/services/config': '<rootDir>/__test__/__mocks__/firebaseConfig.js',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@router/(.*)$': '<rootDir>/src/router/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@context/(.*)$': '<rootDir>/src/context/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
  },

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    // '^.+\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest',
  },
  setupFiles: ['<rootDir>/__test__/jest.polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/__test__/jest.setup.js'],
  transformIgnorePatterns: ['/node_modules/(?!(firebase|@firebase)/)'],
}
