module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    'jest/globals': true,
  },
  rules: {
    'no-console': 1,
  },
};
