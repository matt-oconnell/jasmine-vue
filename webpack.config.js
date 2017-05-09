/* eslint-env node */

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: './src/index.js',
  },
  target: 'web',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader' },
    ],
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
    }
  }
};
