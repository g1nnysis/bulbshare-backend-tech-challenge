module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testEnvironment: "node",
  testRegex: "\\.e2e-spec\\.ts$",
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["jest-extended/all"],
  modulePaths: ["<rootDir>"],
  transform: {
    "^.+\\.(t)s$": "ts-jest"
  },
  coverageDirectory: "../coverage",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  watchPathIgnorePatterns: ["node_modules"]
}
