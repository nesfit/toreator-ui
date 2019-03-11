module.exports = {
  moduleNameMapper: {
    "^.+\\.(s?css|less)$": "identity-obj-proxy",
    ".*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/src/common/config/mockImage.js",
  },
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  collectCoverageFrom: [
  "!<rootDir>/src/**/**/*.test",
  "!<rootDir>/src/common/**/*",
  "!<rootDir>/src/index.tsx",
  "<rootDir>/src/**/**/*.(tsx|jsx)",
  ],
  coverageDirectory:"<rootDir>/build",
  coverageThreshold: {
    "global": {
      "branches": 10,
      "functions": 10,
      "lines": 10,
    }
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  coverageReporters: ["lcov", "text", "text-summary"],
  // Setup Enzyme
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupTestFrameworkScriptFile: "<rootDir>/jest.setup.ts",
};

