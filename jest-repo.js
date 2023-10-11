module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testEnvironment: "node",
  testRegex: "\\.repo-spec\\.ts$",
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["jest-extended/all"],
  globalSetup: "./test/repo-tests.setup.ts",
  modulePaths: ["<rootDir>"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverageFrom: [
    "src/repositories/*.(t|j)s"
  ],
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
};
