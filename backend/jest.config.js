module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testTimeout: 30000,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/controllers/**/*.js',
    'src/middleware/**/*.js'
  ]
};
