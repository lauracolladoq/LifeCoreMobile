// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugings: ['prettier'],
  rules: {
    'prettier/prettier': 'error'
  },
  ignorePatterns: ['/dist/*'],
};
