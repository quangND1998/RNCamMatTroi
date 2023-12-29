module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
      'react-native-reanimated/plugin',
      'module:react-native-dotenv',
      'nativewind/babel',
      "react-native-worklets-core/plugin"
  ],
};