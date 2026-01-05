module.exports = {
  preset: 'jest-expo',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.(ogg|mp3|wav)$': '<rootDir>/__mocks__/noteSoundsMock.js',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/keyCardImagesMock.js',
  },
}
