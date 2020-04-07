module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@utils': './src/utils',
          '@components': './src/components',
          '@models': './src/models',
          '@mocks': './__mocks__',
          '@tests/models': './src/tests/models',
          '@screens': './src/screens',
        },
      },
    ],
  ],
};
