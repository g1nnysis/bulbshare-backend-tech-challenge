module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: [
    'src/**/*.(t|j)s',
    '!src/**/*.entity.ts',
    '!src/**/*.module.ts',
    '!src/main.ts',
    '!src/ormconfig.ts',
    '!src/common/configuration.ts',
    '!src/repositories/**/*.repository.ts',
    '!src/common/decorators.ts',
  ],
  coverageDirectory: '../coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
};