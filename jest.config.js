module.exports = {
  bail: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!**/node_modules/**"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  globals: {
    "ts-jest": {
      tsConfig: {
        target: "es6",
      },
    },
  },
  moduleDirectories: ["node_modules"],
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  testEnvironment: "jsdom",
  testMatch: ["**/*.test.{ts,tsx}"],
  testURL: "http://localhost",
  transformIgnorePatterns: ["/node_modules/.+\\.js$"],
  verbose: true,
};
