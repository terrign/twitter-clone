/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  extensionsToTreatAsEsm: ['.tsx', '.ts'],
  collectCoverageFrom: ['./src/**/*.{ts,tsx,js}', '!**/node_modules/**', '!**/vendor/**', '!./src/index.tsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__test__/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.svg\\?react': '<rootDir>/__test__/__mocks__/svg.js',
    '^@components': '<rootDir>/src/components/index',
    '^@pages': '<rootDir>/src/pages/index',
    '^@router': '<rootDir>/src/router/index',
    '^@services': '<rootDir>/src/services/index',
    '^@types': '<rootDir>/src/types/index',
    '^@constants': '<rootDir>/src/constants/index',
    '^@utils': '<rootDir>/src/utils/index',
    '^@context': '<rootDir>/src/context/index',
    '^@store': '<rootDir>/src/store/index',
    '^@assets': '<rootDir>/src/assets/index',
    '^@hooks': '<rootDir>/src/hooks/index',
    '^@ui': '<rootDir>/src/components/UI/index',
  },

  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest',
  },
  setupFiles: ['<rootDir>/__test__/jest.polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/__test__/jest.setup.js'],
  transformIgnorePatterns: ['/node_modules/(?!(firebase|@firebase)/)'],
}
