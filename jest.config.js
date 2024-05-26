module.exports = {
  // Specifies the test environment
  testEnvironment: "node",

  // Specifies patterns to find test files
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],

  // Transforms .js and .jsx files using Babel
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },

  // Adds setupFiles
  setupFiles: ["./setupTests.js"],
};
