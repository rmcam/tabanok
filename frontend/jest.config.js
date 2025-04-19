/** @type {import('jest').Config} */
export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest',
  },
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  testEnvironmentOptions: {
    jsdom: {
      resources: 'usable',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
