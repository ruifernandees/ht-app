const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  ...tsjPreset,
  preset: "jest-expo",
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    "^.+\\.(js|jsx|tsx)$": "babel-jest"
    // "^.+\\.tsx?$": [
    //   "ts-jest",
    //   {
    //     tsconfig: "tsconfig.json",
    //   },
    // ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};