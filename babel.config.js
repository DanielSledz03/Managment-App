module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@icons': './src/assets/icons/',
            '@components': './src/components/',
            '@view': './src/view/',
            '@utils': './src/utils/',
            '@store': './src/store/',
            '@constants': './src/constants/',
            '@texts': './src/components/texts/',
            '@': './src/',
          },
        },
      ],
    ],
  };
};
