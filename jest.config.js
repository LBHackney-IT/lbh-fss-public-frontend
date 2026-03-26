module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    ".*/settings/mapboxTiles$": "<rootDir>/src/settings/mapboxTiles.jest.js",
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/fileMock.jsx",
    "^.+\\.(css|sass|scss)$": "<rootDir>/src/__mocks__/assetMock.js",
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!lbh-frontend)/"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/index.js",
    "!src/serviceWorker.js",
    "!src/instrument.js",
  ],
};
