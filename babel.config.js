module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            '@images': './src/asset/images',
            '@components': './src/components',
            '@view': './src/view/index.ts',
            '@utils': './src/utils',
            '@store': './src/store',
            '@constants': './src/constants',
            '@texts': './src/components/texts',
          },
        },
      ],
    ],
  };
};
