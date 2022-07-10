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
      tsconfig: {
        target: "es6",
      },
    },
  },
  moduleDirectories: ["node_modules"],
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  testEnvironment: "jsdom",
  testEnvironmentOptions: { url: "http://localhost" },
  testMatch: ["**/*.test.{ts,tsx}"],
  transformIgnorePatterns: ["/node_modules/.+\\.js$"],
  verbose: true,
};
