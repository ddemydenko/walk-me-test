module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  clearMocks: true,
  testRegex: '/test/.*.test.js$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  setupFiles: [
    './test/setup.js',
  ],
  coverageReporters: ['text-summary', 'lcov']
};
